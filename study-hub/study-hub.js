class EnhancedVideoPlayer {
    constructor() {
        this.video = document.getElementById('lectureVideo');
        this.container = document.querySelector('.video-container');
        this.initializeControls();
        this.initializeEffects();
        this.initializeHotkeys();
        this.initializeGestures();
    }

    initializeControls() {
        // Basic controls
        this.controls = {
            play: document.querySelector('.control-btn.play'),
            playPause: document.querySelector('.control-btn.play-pause'),
            rewind: document.querySelector('.control-btn.rewind'),
            forward: document.querySelector('.control-btn.forward'),
            progress: document.querySelector('.progress'),
            volume: document.querySelector('.volume-control input'),
            fullscreen: document.querySelector('.control-btn.fullscreen')
        };
    }

    initializeEffects() {
        // Implementation for initializeEffects method
    }

    initializeHotkeys() {
        // Implementation for initializeHotkeys method
    }

    initializeGestures() {
        // Implementation for initializeGestures method
    }
}

class ResourceManager {
    constructor() {
        this.currentView = 'grid';
        this.currentFilter = 'all';
        this.initializeResourceHandlers();
        this.initializeViewControls();
        this.initializeFilterControls();
        this.initializeSearch();
        this.initializeNavigation();
    }

    initializeViewControls() {
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                this.switchView(view);
                viewBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    switchView(view) {
        const resourcesContainer = document.querySelector('.resources-grid');
        resourcesContainer.style.opacity = '0';
        
        setTimeout(() => {
            if (view === 'list') {
                resourcesContainer.style.gridTemplateColumns = '1fr';
            } else {
                resourcesContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
            }
            resourcesContainer.style.opacity = '1';
        }, 300);
    }

    initializeFilterControls() {
        const filterTags = document.querySelectorAll('.filter-tag');
        filterTags.forEach(tag => {
            tag.addEventListener('click', () => {
                const type = tag.dataset.type;
                this.filterResources(type);
                filterTags.forEach(t => t.classList.remove('active'));
                tag.classList.add('active');
            });
        });
    }

    filterResources(type) {
        const resources = document.querySelectorAll('.resource-card');
        resources.forEach(resource => {
            resource.style.opacity = '0';
            resource.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                if (type === 'all' || resource.dataset.type === type) {
                    resource.style.display = 'block';
                    setTimeout(() => {
                        resource.style.opacity = '1';
                        resource.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    resource.style.display = 'none';
                }
            }, 300);
        });
    }

    initializeSearch() {
        const searchInput = document.querySelector('.search-bar input');
        let debounceTimer;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                this.searchResources(e.target.value.toLowerCase());
            }, 300);
        });
    }

    searchResources(query) {
        const resources = document.querySelectorAll('.resource-card');
        resources.forEach(resource => {
            const title = resource.querySelector('h4').textContent.toLowerCase();
            const desc = resource.querySelector('.resource-desc').textContent.toLowerCase();
            
            resource.style.opacity = '0';
            resource.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                if (title.includes(query) || desc.includes(query)) {
                    resource.style.display = 'block';
                    setTimeout(() => {
                        resource.style.opacity = '1';
                        resource.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    resource.style.display = 'none';
                }
            }, 300);
        });
    }

    handleDownload(resourceItem, progressBar) {
        const resourceName = resourceItem.querySelector('h4').textContent;
        
        // Disable download button during progress
        const downloadBtn = resourceItem.querySelector('.download-btn');
        downloadBtn.disabled = true;
        
        // Show progress animation
        let progress = 0;
        progressBar.style.display = 'block';
        
        const downloadInterval = setInterval(() => {
            progress += 2;
            progressBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(downloadInterval);
                this.completeDownload(resourceName);
                downloadBtn.disabled = false;
                
                setTimeout(() => {
                    progressBar.style.width = '0%';
                    progressBar.style.display = 'none';
                }, 500);
            }
        }, 50);
    }

    completeDownload(name) {
        const notification = document.createElement('div');
        notification.className = 'download-notification';
        notification.innerHTML = `
            <ion-icon name="checkmark-circle"></ion-icon>
            <span>${name} downloaded successfully!</span>
        `;
        
        document.body.appendChild(notification);
        
        // Animate notification
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    previewResource(resourceItem) {
        const type = resourceItem.dataset.type;
        const title = resourceItem.querySelector('h4').textContent;
        
        const modal = document.createElement('div');
        modal.className = 'preview-modal';
        modal.style.opacity = '0';
        
        modal.innerHTML = this.getPreviewContent(type, title);
        document.body.appendChild(modal);
        
        // Animate modal opening
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
        });

        // Close modal functionality
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        });
    }

    getPreviewContent(type, title) {
        switch(type) {
            case 'pdf':
                return `
                    <div class="preview-content">
                        <div class="preview-header">
                            <h3>${title}</h3>
                            <button class="close-btn">
                                <ion-icon name="close-outline"></ion-icon>
                            </button>
                        </div>
                        <div class="preview-body">
                            <iframe src="path/to/pdf/${title}.pdf"></iframe>
                        </div>
                    </div>
                `;
            case 'video':
                return `
                    <div class="preview-content">
                        <div class="preview-header">
                            <h3>${title}</h3>
                            <button class="close-btn">
                                <ion-icon name="close-outline"></ion-icon>
                            </button>
                        </div>
                        <div class="preview-body">
                            <video controls>
                                <source src="path/to/videos/${title}.mp4" type="video/mp4">
                            </video>
                        </div>
                    </div>
                `;
            default:
                return '';
        }
    }

    initializeNavigation() {
        // Profile dropdown
        const profileCard = document.querySelector('.profile-card');
        const profileSection = document.querySelector('.profile-section');
        
        profileCard.addEventListener('click', () => {
            profileSection.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!profileSection.contains(e.target)) {
                profileSection.classList.remove('active');
            }
        });

        // Mobile navigation toggle
        const navToggle = document.querySelector('.nav-toggle');
        const studyNav = document.querySelector('.study-nav');
        
        navToggle.addEventListener('click', () => {
            studyNav.classList.toggle('active');
        });

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('change', () => {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('darkTheme', themeToggle.checked);
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('darkTheme');
        if (savedTheme === 'true') {
            themeToggle.checked = true;
            document.body.classList.add('dark-theme');
        }
    }
}

class AdvancedSearchEngine {
    constructor() {
        this.initializeSearchComponents();
        this.initializeAISearch();
        this.initializeSearchHistory();
        this.initializeTrendingTopics();
    }

    initializeSearchComponents() {
        this.searchInput = document.getElementById('resourceSearch');
        this.searchContainer = document.querySelector('.search-bar-container');
        
        // Add AI-powered search UI elements
        this.searchContainer.insertAdjacentHTML('beforeend', `
            <div class="search-features">
                <div class="search-mode-toggle">
                    <button class="mode-btn active" data-mode="all">
                        <ion-icon name="search"></ion-icon>
                        All
                    </button>
                    <button class="mode-btn" data-mode="courses">
                        <ion-icon name="book"></ion-icon>
                        Courses
                    </button>
                    <button class="mode-btn" data-mode="resources">
                        <ion-icon name="library"></ion-icon>
                        Resources
                    </button>
                </div>
                <div class="ai-search-features">
                    <button class="ai-search-btn" title="AI Search Assistant">
                        <ion-icon name="bulb"></ion-icon>
                        <span>AI Search</span>
                    </button>
                    <button class="voice-search-btn" title="Voice Search">
                        <ion-icon name="mic"></ion-icon>
                    </button>
                    <button class="camera-search-btn" title="Visual Search">
                        <ion-icon name="camera"></ion-icon>
                    </button>
                </div>
            </div>
            <div class="trending-topics">
                <h4>Trending Topics</h4>
                <div class="topic-chips"></div>
            </div>
            <div class="ai-suggestions">
                <div class="suggestion-header">
                    <ion-icon name="bulb"></ion-icon>
                    <span>AI Suggestions</span>
                </div>
                <div class="suggestion-content"></div>
            </div>
        `);

        this.setupEventListeners();
        this.initializeTrendingTopics();
    }

    setupEventListeners() {
        // Enhanced search input behavior
        this.searchInput.addEventListener('focus', () => {
            this.searchContainer.classList.add('focused');
            this.showSearchHistory();
            this.activateAIAssistant();
        });

        // AI-powered search suggestions
        let debounceTimer;
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                this.handleAISearch(e.target.value);
            }, 300);
        });

        // Search mode toggle
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.updateSearchResults(this.searchInput.value, btn.dataset.mode);
            });
        });
    }

    initializeTrendingTopics() {
        const topics = [
            { name: 'React Hooks', icon: 'logo-react', count: 1250 },
            { name: 'Machine Learning', icon: 'brain', count: 890 },
            { name: 'Web Security', icon: 'shield', count: 756 },
            { name: 'Cloud Computing', icon: 'cloud', count: 642 }
        ];

        const topicChips = document.querySelector('.topic-chips');
        topicChips.innerHTML = topics.map(topic => `
            <div class="topic-chip">
                <ion-icon name="${topic.icon}"></ion-icon>
                <span>${topic.name}</span>
                <span class="topic-count">${topic.count}+</span>
            </div>
        `).join('');
    }

    activateAIAssistant() {
        const aiSuggestions = document.querySelector('.ai-suggestions');
        aiSuggestions.innerHTML = `
            <div class="ai-typing">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <p>AI Assistant is ready to help...</p>
            </div>
        `;
    }

    handleAISearch(query) {
        if (query.length < 2) return;

        const aiSuggestions = document.querySelector('.suggestion-content');
        aiSuggestions.innerHTML = `
            <div class="ai-suggestion">
                <div class="suggestion-type">
                    <ion-icon name="bulb"></ion-icon>
                    <span>Smart Suggestion</span>
                </div>
                <p>Looking for resources about "${query}"? Here are some recommendations:</p>
                <div class="quick-filters">
                    <button>${query} tutorials</button>
                    <button>${query} advanced topics</button>
                    <button>Best practices for ${query}</button>
                </div>
            </div>
        `;
    }

    // Add these styles to your CSS
    static get styles() {
        return `
            .search-mode-toggle {
                display: flex;
                gap: 0.5rem;
                background: rgba(255, 255, 255, 0.05);
                padding: 0.5rem;
                border-radius: 12px;
                margin-bottom: 1rem;
            }

            .mode-btn {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.75rem 1.25rem;
                border: none;
                border-radius: 8px;
                background: transparent;
                color: var(--gray);
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .mode-btn.active {
                background: var(--primary);
                color: var(--dark);
            }

            .ai-search-features {
                display: flex;
                gap: 1rem;
            }

            .ai-search-btn {
                background: linear-gradient(45deg, #00ff88, var(--primary));
                color: var(--dark);
                border: none;
                border-radius: 20px;
                padding: 0.75rem 1.5rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .topic-chips {
                display: flex;
                gap: 1rem;
                overflow-x: auto;
                padding: 0.5rem 0;
                scrollbar-width: none;
            }

            .topic-chip {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 20px;
                white-space: nowrap;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .topic-chip:hover {
                background: var(--primary);
                color: var(--dark);
            }

            .topic-count {
                font-size: 0.8rem;
                opacity: 0.7;
            }

            .ai-suggestions {
                margin-top: 1rem;
                padding: 1rem;
                background: rgba(255, 255, 255, 0.03);
                border-radius: 12px;
                border: 1px solid rgba(255, 255, 255, 0.05);
            }

            .typing-indicator {
                display: flex;
                gap: 0.25rem;
            }

            .typing-indicator span {
                width: 8px;
                height: 8px;
                background: var(--primary);
                border-radius: 50%;
                animation: typing 1s infinite;
            }

            .typing-indicator span:nth-child(2) {
                animation-delay: 0.2s;
            }

            .typing-indicator span:nth-child(3) {
                animation-delay: 0.4s;
            }

            @keyframes typing {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }

            .quick-filters {
                display: flex;
                gap: 0.5rem;
                margin-top: 1rem;
                flex-wrap: wrap;
            }

            .quick-filters button {
                background: rgba(255, 255, 255, 0.1);
                border: none;
                border-radius: 15px;
                padding: 0.5rem 1rem;
                color: var(--light);
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .quick-filters button:hover {
                background: var(--primary);
                color: var(--dark);
            }
        `;
    }
}

class SmoothInteractions {
    constructor() {
        this.initializeAnimations();
        this.initializeCounters();
        this.initializeProgressRings();
        this.initializeHoverEffects();
    }

    initializeAnimations() {
        // Smooth reveal of elements on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    // Start counter animation when stats are visible
                    if (entry.target.classList.contains('stat-card')) {
                        this.animateCounter(entry.target.querySelector('.stat-value'));
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px'
        });

        // Observe elements
        document.querySelectorAll('.resource-card, .stat-card, .milestone').forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    initializeCounters() {
        // Animate number counters
        const animateCounter = (element) => {
            const target = parseInt(element.dataset.count);
            const duration = 2000;
            const step = target / duration * 10;
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                element.textContent = Math.floor(current);

                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                }
            }, 10);
        };

        document.querySelectorAll('.stat-value[data-count]').forEach(counter => {
            animateCounter(counter);
        });
    }

    initializeProgressRings() {
        document.querySelectorAll('.progress-ring-circle').forEach(circle => {
            const radius = circle.r.baseVal.value;
            const circumference = radius * 2 * Math.PI;
            
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = circumference;

            // Animate progress
            const progress = parseInt(circle.closest('.stat-card').querySelector('.stat-value').textContent);
            const offset = circumference - (progress / 100) * circumference;
            
            setTimeout(() => {
                circle.style.strokeDashoffset = offset;
            }, 100);
        });
    }

    initializeHoverEffects() {
        // Parallax effect on cards
        document.querySelectorAll('.resource-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }
}

class EnhancedResourceManager {
    constructor() {
        this.initializeFilters();
        this.initializeViewToggle();
        this.initializeSorting();
        this.initializeSearch();
    }

    initializeFilters() {
        const filterTags = document.querySelectorAll('.filter-tag');
        const resources = document.querySelectorAll('.resource-card');

        filterTags.forEach(tag => {
            tag.addEventListener('click', () => {
                // Smooth transition for filter changes
                resources.forEach(resource => {
                    resource.style.opacity = '0';
                    resource.style.transform = 'scale(0.95)';
                });

                setTimeout(() => {
                    const type = tag.dataset.type;
                    resources.forEach(resource => {
                        if (type === 'all' || resource.dataset.type === type) {
                            resource.style.display = 'block';
                            setTimeout(() => {
                                resource.style.opacity = '1';
                                resource.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            resource.style.display = 'none';
                        }
                    });
                }, 300);

                filterTags.forEach(t => t.classList.remove('active'));
                tag.classList.add('active');
            });
        });
    }

    initializeViewToggle() {
        const viewBtns = document.querySelectorAll('.view-toggle button');
        const resourcesGrid = document.querySelector('.resources-grid');

        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                resourcesGrid.style.opacity = '0';
                
                setTimeout(() => {
                    resourcesGrid.className = `resources-grid view-${view}`;
                    resourcesGrid.style.opacity = '1';
                }, 300);

                viewBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    initializeSorting() {
        const sortSelect = document.querySelector('.sort-select');
        const resourcesGrid = document.querySelector('.resources-grid');

        sortSelect.addEventListener('change', () => {
            const resources = Array.from(document.querySelectorAll('.resource-card'));
            resourcesGrid.style.opacity = '0';

            setTimeout(() => {
                const sortedResources = this.sortResources(resources, sortSelect.value);
                resourcesGrid.innerHTML = '';
                sortedResources.forEach(resource => resourcesGrid.appendChild(resource));
                resourcesGrid.style.opacity = '1';
            }, 300);
        });
    }

    sortResources(resources, criteria) {
        return resources.sort((a, b) => {
            switch (criteria) {
                case 'rating':
                    return this.getRating(b) - this.getRating(a);
                case 'popularity':
                    return this.getStudentCount(b) - this.getStudentCount(a);
                case 'recent':
                    return new Date(b.dataset.date) - new Date(a.dataset.date);
                default:
                    return 0;
            }
        });
    }

    getRating(resource) {
        return parseFloat(resource.querySelector('.rating span').textContent);
    }

    getStudentCount(resource) {
        const text = resource.querySelector('.students span').textContent;
        return parseInt(text.replace(/[^0-9]/g, ''));
    }

    initializeSearch() {
        const searchInput = document.getElementById('resourceSearch');
        let debounceTimer;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                this.performSearch(e.target.value.toLowerCase());
            }, 300);
        });
    }

    performSearch(query) {
        const resources = document.querySelectorAll('.resource-card');
        
        resources.forEach(resource => {
            const title = resource.querySelector('.resource-title').textContent.toLowerCase();
            const desc = resource.querySelector('.resource-desc').textContent.toLowerCase();
            
            resource.style.transition = 'all 0.3s ease';
            
            if (title.includes(query) || desc.includes(query)) {
                resource.style.opacity = '1';
                resource.style.transform = 'scale(1)';
                resource.style.display = 'block';
            } else {
                resource.style.opacity = '0';
                resource.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    resource.style.display = 'none';
                }, 300);
            }
        });
    }
}

class ScrollManager {
    constructor() {
        this.initializeRightSectionScroll();
        this.initializeScrollProgress();
        this.initializeFloatingScroll();
    }

    initializeFloatingScroll() {
        const rightSection = document.querySelector('.resources-sidebar');
        
        // Create floating scroll controls
        const scrollControls = document.createElement('div');
        scrollControls.className = 'floating-scroll-controls';
        scrollControls.innerHTML = `
            <div class="scroll-indicator">
                <div class="scroll-progress-ring">
                    <svg>
                        <circle class="progress-ring-circle" cx="25" cy="25" r="20"></circle>
                    </svg>
                    <span class="scroll-percentage">0%</span>
                </div>
            </div>
            <div class="scroll-buttons">
                <button class="scroll-btn scroll-up" title="Scroll Up">
                    <ion-icon name="chevron-up-outline"></ion-icon>
                </button>
                <button class="scroll-btn scroll-down" title="Scroll Down">
                    <ion-icon name="chevron-down-outline"></ion-icon>
                </button>
            </div>
        `;
        rightSection.appendChild(scrollControls);

        // Initialize scroll controls
        this.initializeScrollControls(rightSection, scrollControls);
    }

    initializeScrollControls(container, controls) {
        const upBtn = controls.querySelector('.scroll-up');
        const downBtn = controls.querySelector('.scroll-down');
        const progressRing = controls.querySelector('.progress-ring-circle');
        const percentageText = controls.querySelector('.scroll-percentage');

        // Set up progress ring
        const radius = progressRing.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        progressRing.style.strokeDasharray = `${circumference} ${circumference}`;

        // Update scroll progress
        container.addEventListener('scroll', () => {
            const scrollPercentage = (container.scrollTop / 
                (container.scrollHeight - container.clientHeight)) * 100;
            
            // Update progress ring
            const offset = circumference - (scrollPercentage / 100) * circumference;
            progressRing.style.strokeDashoffset = offset;
            
            // Update percentage text
            percentageText.textContent = `${Math.round(scrollPercentage)}%`;
        });

        // Scroll button handlers
        upBtn.addEventListener('click', () => this.smoothScroll(container, 'up'));
        downBtn.addEventListener('click', () => this.smoothScroll(container, 'down'));
    }

    smoothScroll(container, direction) {
        const scrollAmount = container.clientHeight * 0.8;
        const currentScroll = container.scrollTop;
        const targetScroll = direction === 'up' 
            ? Math.max(0, currentScroll - scrollAmount)
            : currentScroll + scrollAmount;

        container.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    }
}

class SocialInteractions {
    constructor() {
        this.initializeSaveButton();
        this.initializeShareButton();
        this.initializeTooltips();
    }

    initializeSaveButton() {
        const saveButtons = document.querySelectorAll('.save-btn');
        
        saveButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('.resource-card');
                const isSaved = btn.classList.contains('saved');
                
                // Animate the save action
                if (!isSaved) {
                    this.createSaveAnimation(btn);
                }
                
                btn.classList.toggle('saved');
                this.updateSaveCount(card, !isSaved);
                this.showNotification(isSaved ? 'Resource removed from saved items' : 'Resource saved successfully!');
            });
        });
    }

    createSaveAnimation(button) {
        // Create floating hearts animation
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('span');
            heart.className = 'floating-heart';
            heart.innerHTML = '<ion-icon name="heart"></ion-icon>';
            button.appendChild(heart);
            
            // Random position and animation
            const randomX = (Math.random() - 0.5) * 100;
            const randomRotate = (Math.random() - 0.5) * 60;
            
            heart.style.setProperty('--x', `${randomX}px`);
            heart.style.setProperty('--rotate', `${randomRotate}deg`);
            
            // Remove after animation
            heart.addEventListener('animationend', () => heart.remove());
        }
    }

    initializeShareButton() {
        const shareButtons = document.querySelectorAll('.share-btn');
        
        shareButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('.resource-card');
                const shareData = this.getShareData(card);
                
                // Create and show share modal
                this.showShareModal(shareData);
            });
        });
    }

    getShareData(card) {
        return {
            title: card.querySelector('.resource-title').textContent,
            description: card.querySelector('.resource-desc').textContent,
            url: window.location.href,
            type: card.dataset.type
        };
    }

    showShareModal(data) {
        const modal = document.createElement('div');
        modal.className = 'share-modal';
        modal.innerHTML = `
            <div class="share-content">
                <div class="share-header">
                    <h3>Share This Resource</h3>
                    <button class="close-btn">
                        <ion-icon name="close-outline"></ion-icon>
                    </button>
                </div>
                <div class="share-preview">
                    <div class="preview-image">
                        <ion-icon name="${this.getTypeIcon(data.type)}"></ion-icon>
                    </div>
                    <div class="preview-info">
                        <h4>${data.title}</h4>
                        <p>${data.description}</p>
                    </div>
                </div>
                <div class="share-options">
                    <button class="share-option" data-platform="facebook">
                        <ion-icon name="logo-facebook"></ion-icon>
                        <span>Facebook</span>
                    </button>
                    <button class="share-option" data-platform="twitter">
                        <ion-icon name="logo-twitter"></ion-icon>
                        <span>Twitter</span>
                    </button>
                    <button class="share-option" data-platform="linkedin">
                        <ion-icon name="logo-linkedin"></ion-icon>
                        <span>LinkedIn</span>
                    </button>
                    <button class="share-option" data-platform="email">
                        <ion-icon name="mail-outline"></ion-icon>
                        <span>Email</span>
                    </button>
                </div>
                <div class="share-link">
                    <input type="text" value="${data.url}" readonly>
                    <button class="copy-btn">
                        <ion-icon name="copy-outline"></ion-icon>
                        Copy
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Add event listeners
        this.initializeShareModalEvents(modal, data);
        
        // Animate modal entry
        requestAnimationFrame(() => modal.classList.add('active'));
    }

    initializeShareModalEvents(modal, data) {
        // Close button
        modal.querySelector('.close-btn').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });

        // Share options
        modal.querySelectorAll('.share-option').forEach(btn => {
            btn.addEventListener('click', () => {
                this.handleShare(btn.dataset.platform, data);
            });
        });

        // Copy link
        const copyBtn = modal.querySelector('.copy-btn');
        copyBtn.addEventListener('click', () => {
            const input = modal.querySelector('input');
            input.select();
            document.execCommand('copy');
            
            copyBtn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon> Copied!';
            setTimeout(() => {
                copyBtn.innerHTML = '<ion-icon name="copy-outline"></ion-icon> Copy';
            }, 2000);
        });
    }

    handleShare(platform, data) {
        const urls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.url)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(data.url)}&text=${encodeURIComponent(data.title)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(data.url)}`,
            email: `mailto:?subject=${encodeURIComponent(data.title)}&body=${encodeURIComponent(data.description + '\n\n' + data.url)}`
        };

        if (platform === 'email') {
            window.location.href = urls[platform];
        } else {
            window.open(urls[platform], '_blank', 'width=600,height=400');
        }
    }

    getTypeIcon(type) {
        const icons = {
            pdf: 'document-text',
            video: 'videocam',
            quiz: 'help-circle',
            code: 'code-slash'
        };
        return icons[type] || 'document';
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <ion-icon name="checkmark-circle"></ion-icon>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        requestAnimationFrame(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        });
    }

    initializeTooltips() {
        const buttons = document.querySelectorAll('.save-btn, .share-btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', (e) => {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = btn.title;
                document.body.appendChild(tooltip);
                
                const rect = btn.getBoundingClientRect();
                tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;
                tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
                
                requestAnimationFrame(() => tooltip.classList.add('show'));
            });
            
            btn.addEventListener('mouseleave', () => {
                const tooltip = document.querySelector('.tooltip');
                if (tooltip) {
                    tooltip.remove();
                }
            });
        });
    }

    updateSaveCount(card, isSaving) {
        const saveCount = card.querySelector('.save-count');
        let count = parseInt(saveCount.textContent);
        count = isSaving ? count + 1 : count - 1;
        
        // Animate count change
        saveCount.style.transform = 'scale(1.2)';
        setTimeout(() => {
            saveCount.textContent = count;
            saveCount.style.transform = 'scale(1)';
        }, 100);
    }

    initializeQuickShare() {
        const platformIcons = document.querySelectorAll('.platform-icon');
        
        platformIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent share modal from opening
                const platform = icon.classList[1]; // facebook, twitter, or linkedin
                const card = icon.closest('.resource-card');
                const data = this.getShareData(card);
                
                this.handleShare(platform, data);
                
                // Show mini notification
                this.showMiniNotification(icon, `Shared on ${platform}`);
            });
        });
    }

    showMiniNotification(element, message) {
        const notification = document.createElement('div');
        notification.className = 'mini-notification';
        notification.textContent = message;
        
        element.appendChild(notification);
        
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(-10px)';
        });
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(0)';
            setTimeout(() => notification.remove(), 300);
        }, 1500);
    }
}

class BackgroundEffects {
    constructor() {
        this.initializeBackgroundEffects();
        this.initializeGlowEffects();
    }

    initializeBackgroundEffects() {
        const container = document.querySelector('.study-container');
        
        // Add background elements
        container.insertAdjacentHTML('afterbegin', `
            <div class="cyber-background">
                <div class="glow-grid"></div>
                <div class="pulse-circles"></div>
                <div class="floating-particles"></div>
            </div>
        `);

        // Create grid cells
        const glowGrid = document.querySelector('.glow-grid');
        for (let i = 0; i < 50; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            glowGrid.appendChild(cell);
        }

        // Create pulse circles
        const pulseCircles = document.querySelector('.pulse-circles');
        for (let i = 0; i < 3; i++) {
            const circle = document.createElement('div');
            circle.className = 'pulse-circle';
            circle.style.animationDelay = `${i * 0.5}s`;
            pulseCircles.appendChild(circle);
        }

        // Create floating particles
        const particles = document.querySelector('.floating-particles');
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particles.appendChild(particle);
        }

        this.startBackgroundAnimation();
    }

    initializeGlowEffects() {
        // Add these styles dynamically
        const styles = `
            .cyber-background {
                position: fixed;
                inset: 0;
                z-index: -1;
                background: var(--dark);
                overflow: hidden;
            }

            .glow-grid {
                position: absolute;
                inset: 0;
                display: grid;
                grid-template-columns: repeat(10, 1fr);
                gap: 2px;
                opacity: 0.1;
            }

            .grid-cell {
                background: var(--primary);
                animation: cellGlow 4s infinite;
            }

            .pulse-circles {
                position: absolute;
                inset: 0;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .pulse-circle {
                position: absolute;
                width: 150px;
                height: 150px;
                border-radius: 50%;
                background: var(--primary-glow);
                animation: pulseGlow 3s infinite;
            }

            .floating-particles {
                position: absolute;
                inset: 0;
            }

            .particle {
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--primary);
                border-radius: 50%;
                animation: floatParticle 5s infinite linear;
            }

            @keyframes cellGlow {
                0%, 100% { opacity: 0.1; }
                50% { opacity: 0.3; }
            }

            @keyframes pulseGlow {
                0% {
                    transform: scale(0.8);
                    opacity: 0;
                }
                50% {
                    opacity: 0.1;
                }
                100% {
                    transform: scale(2);
                    opacity: 0;
                }
            }

            @keyframes floatParticle {
                0% {
                    transform: translateY(100vh) scale(1);
                    opacity: 0;
                }
                50% {
                    opacity: 0.5;
                }
                100% {
                    transform: translateY(-100px) scale(0);
                    opacity: 0;
                }
            }

            /* Enhanced glow effects */
            .cyber-background::before {
                content: '';
                position: absolute;
                inset: 0;
                background: radial-gradient(
                    circle at 50% 50%,
                    var(--primary-glow) 0%,
                    transparent 70%
                );
                opacity: 0.1;
                animation: backgroundPulse 8s infinite;
            }

            @keyframes backgroundPulse {
                0%, 100% {
                    opacity: 0.1;
                    transform: scale(1);
                }
                50% {
                    opacity: 0.2;
                    transform: scale(1.1);
                }
            }

            /* Random cell highlight effect */
            .grid-cell.highlight {
                animation: cellHighlight 1s;
            }

            @keyframes cellHighlight {
                0% {
                    opacity: 0.1;
                }
                50% {
                    opacity: 1;
                    box-shadow: 0 0 20px var(--primary-glow);
                }
                100% {
                    opacity: 0.1;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    startBackgroundAnimation() {
        // Random cell highlight effect
        setInterval(() => {
            const cells = document.querySelectorAll('.grid-cell');
            const randomCell = cells[Math.floor(Math.random() * cells.length)];
            randomCell.classList.add('highlight');
            setTimeout(() => {
                randomCell.classList.remove('highlight');
            }, 1000);
        }, 2000);

        // Dynamic color shift
        let hue = 180; // Starting with cyan
        setInterval(() => {
            hue = (hue + 1) % 360;
            document.documentElement.style.setProperty(
                '--primary',
                `hsl(${hue}, 100%, 42%)`
            );
            document.documentElement.style.setProperty(
                '--primary-glow',
                `hsla(${hue}, 100%, 42%, 0.5)`
            );
        }, 100);
    }
}

// Add this CSS to your study-hub.css file
const styles = `
    .scroll-controls {
        position: fixed;
        right: 2rem;
        bottom: 2rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        z-index: 100;
    }

    .scroll-btn {
        background: var(--primary);
        color: var(--dark);
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        opacity: 0;
        pointer-events: none;
    }

    .scroll-btn:hover {
        transform: scale(1.1);
        background: var(--primary-glow);
    }

    .scroll-btn ion-icon {
        font-size: 1.5rem;
    }

    .scroll-progress-bar {
        position: fixed;
        top: 0;
        right: 0;
        width: 0;
        height: 2px;
        background: var(--primary);
        transition: width 0.3s ease;
    }

    .resources-sidebar {
        position: relative;
        max-height: 100vh;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--primary) rgba(255, 255, 255, 0.1);
    }

    .resources-sidebar::-webkit-scrollbar {
        width: 6px;
    }

    .resources-sidebar::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
    }

    .resources-sidebar::-webkit-scrollbar-thumb {
        background: var(--primary);
        border-radius: 3px;
    }
`;

// Add the styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Initialize both classes
document.addEventListener('DOMContentLoaded', () => {
    const videoPlayer = new EnhancedVideoPlayer();
    const resourceManager = new ResourceManager();
    const advancedSearch = new AdvancedSearchEngine();
    const smoothInteractions = new SmoothInteractions();
    const enhancedResourceManager = new EnhancedResourceManager();
    const scrollManager = new ScrollManager();
    const socialInteractions = new SocialInteractions();
    const backgroundEffects = new BackgroundEffects();

    // Create scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    // Update scroll progress
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = 
            document.documentElement.scrollHeight - 
            document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.documentElement.style.setProperty('--scroll', `${scrolled}%`);
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        {
            threshold: 0.1
        }
    );

    // Observe all sections
    document.querySelectorAll('.main-content > section').forEach(section => {
        observer.observe(section);
    });
});
