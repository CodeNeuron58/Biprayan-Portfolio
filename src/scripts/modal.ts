import projectsData from '../data/projects.json';

interface ProjectDetails {
  problem_statement: string;
  diagram_url?: string;
  detailed_stack: string[];
}

interface Project {
  id: string;
  name: string;
  date: string;
  description: string;
  tags: string[];
  links: {
    github?: string;
  };
  details?: ProjectDetails;
}

class Modal {
  private overlay: HTMLElement | null = null;
  private closeButton: HTMLElement | null = null;
  private triggerElement: HTMLElement | null = null;
  private focusableElements: HTMLElement[] = [];
  private firstFocusableElement: HTMLElement | null = null;
  private lastFocusableElement: HTMLElement | null = null;

  constructor() {
    this.initializeElements();
    this.attachEventListeners();
  }

  private initializeElements(): void {
    this.overlay = document.getElementById('project-modal');
    this.closeButton = this.overlay?.querySelector('.modal-close') || null;
  }

  private attachEventListeners(): void {
    if (!this.overlay || !this.closeButton) return;

    // Close button
    this.closeButton.addEventListener('click', () => this.close());

    // Backdrop click
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.overlay?.classList.contains('modal-open')) {
        this.close();
      }
    });
  }

  public open(projectId: string): void {
    const project = this.findProjectById(projectId);
    if (!project) {
      console.error(`Project with ID ${projectId} not found`);
      return;
    }

    // Store trigger element for focus restoration
    this.triggerElement = document.activeElement as HTMLElement;

    // Populate modal content
    this.populateContent(project);

    // Show modal
    this.overlay?.classList.add('modal-open');
    this.overlay?.setAttribute('aria-hidden', 'false');

    // Trap focus
    this.trapFocus();

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  public close(): void {
    this.overlay?.classList.remove('modal-open');
    this.overlay?.setAttribute('aria-hidden', 'true');

    // Restore body scroll
    document.body.style.overflow = '';

    // Restore focus to trigger element
    if (this.triggerElement) {
      this.triggerElement.focus();
    }
  }

  private findProjectById(id: string): Project | undefined {
    return projectsData.find((project: Project) => project.id === id);
  }

  private populateContent(project: Project): void {
    if (!this.overlay) return;

    // Populate header
    const nameElement = document.getElementById('modal-project-name');
    const dateElement = document.getElementById('modal-project-date');
    const linksElement = document.getElementById('modal-project-links');

    if (nameElement) nameElement.textContent = project.name;
    if (dateElement) dateElement.textContent = project.date;

    if (linksElement && project.links) {
      linksElement.innerHTML = '';
      if (project.links.github) {
        const githubBtn = document.createElement('a');
        githubBtn.href = project.links.github;
        githubBtn.target = '_blank';
        githubBtn.className = 'modal-link-btn';
        githubBtn.textContent = 'GitHub';
        linksElement.appendChild(githubBtn);
      }
    }

    // Populate problem statement
    const problemElement = document.getElementById('modal-problem-statement');
    if (problemElement && project.details?.problem_statement) {
      problemElement.textContent = project.details.problem_statement;
    }

    // Populate diagram or show placeholder
    const diagramImage = document.getElementById('modal-diagram-image') as HTMLImageElement;
    const diagramPlaceholder = document.getElementById('modal-diagram-placeholder');

    if (project.details?.diagram_url) {
      if (diagramImage) {
        diagramImage.src = project.details.diagram_url;
        diagramImage.style.display = 'block';
      }
      if (diagramPlaceholder) {
        diagramPlaceholder.style.display = 'none';
      }
    } else {
      if (diagramImage) {
        diagramImage.style.display = 'none';
      }
      if (diagramPlaceholder) {
        diagramPlaceholder.style.display = 'flex';
      }
    }

    // Populate detailed tech stack
    const stackElement = document.getElementById('modal-detailed-stack');
    if (stackElement && project.details?.detailed_stack) {
      stackElement.innerHTML = project.details.detailed_stack
        .map(item => `<span class="modal-stack-item">${item}</span>`)
        .join('');
    }
  }

  private trapFocus(): void {
    if (!this.overlay) return;

    // Get all focusable elements within the modal
    this.focusableElements = Array.from(
      this.overlay.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );

    if (this.focusableElements.length === 0) return;

    this.firstFocusableElement = this.focusableElements[0];
    this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];

    // Focus first element
    this.firstFocusableElement.focus();

    // Add keydown listener for focus trapping
    this.overlay.addEventListener('keydown', this.handleKeyDown);
  }

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === this.firstFocusableElement) {
        e.preventDefault();
        this.lastFocusableElement?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === this.lastFocusableElement) {
        e.preventDefault();
        this.firstFocusableElement?.focus();
      }
    }
  };
}

// Export singleton instance
export const modal = new Modal();
