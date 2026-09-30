/* ==========================================================================
   REFAAT ELIA — AI ENGINEER PORTFOLIO INTERACTIVE LOGIC
   Neural Canvas, JobPilot Simulator, Dynamic Filtering & Modals
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initTypewriter();
  initStatsCounter();
  initProjectFilters();
  initJobPilotSimulator();
  initModal();
  initTerminalTabs();
  initNavbarScroll();
  initCopyButtons();
});

/* ==========================================================================
   1. NEURAL NETWORK PARTICLES CANVAS
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  });

  const particleCount = Math.min(Math.floor(width / 15), 70);
  let particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.5 ? '#00f2fe' : '#7928ca';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    const maxDistance = 140;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
  }

  createParticles();
  animate();
}

/* ==========================================================================
   2. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriter-target');
  if (!target) return;

  const roles = [
    'AI Engineer & Specialist',
    'Multi-Agent AI Systems Developer',
    'Generative AI & RAG Architect',
    'Vision Transformer Specialist',
    'PyTorch & FastAPI Expert'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let speed = 90;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      speed = 40;
    } else {
      target.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      speed = 90;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      speed = 1800; // Pause at top
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}

/* ==========================================================================
   3. ANIMATED STAT COUNTER
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetCount = parseInt(el.getAttribute('data-count'), 10);
        let count = 0;
        const duration = 1500;
        const step = targetCount / (duration / 20);

        const timer = setInterval(() => {
          count += step;
          if (count >= targetCount) {
            el.innerHTML = `${targetCount}<span>+</span>`;
            clearInterval(timer);
          } else {
            el.innerHTML = `${Math.floor(count)}<span>+</span>`;
          }
        }, 20);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => observer.observe(el));
}

/* ==========================================================================
   4. JOBPILOT MULTI-AGENT SIMULATOR
   ========================================================================== */
function initJobPilotSimulator() {
  const simBtn = document.getElementById('run-sim-btn');
  const steps = document.querySelectorAll('.sim-step');
  const outputBox = document.getElementById('sim-output');
  if (!simBtn || !outputBox) return;

  const simulationLogs = [
    {
      step: 0,
      log: `[AGENT 1: CV Parsing Agent]\n> Parsing Candidate CV: "Refaat Elia Eshak"\n> Extracted Skills: PyTorch, Vision Transformers (ViT), LLMs, LangChain, RAG, FAISS, FastAPI, Python.\n> Education: B.Sc. Computer Science (AI Major, GPA 3.43).\n✓ Candidate Profile Vectorized.`
    },
    {
      step: 1,
      log: `[AGENT 2: Job Requirements Agent]\n> Parsing Job Description: "Senior AI & RAG Engineer @ Tech Global"\n> Core Requirements Identified:\n  - Deep Learning & PyTorch (Weight: 30%)\n  - RAG Architecture & Vector Search (Weight: 35%)\n  - Agent Frameworks & Production Deployment (Weight: 35%)\n✓ Requirements Matrix Structured.`
    },
    {
      step: 2,
      log: `[AGENT 3: FAISS Vector RAG Retriever]\n> Querying FAISS Vector Database for candidate evidence...\n> Top Match 1: Graduation Project RAD-DINO + RAG Chatbot (Similarity: 0.96)\n> Top Match 2: Tips Hindawi LLM & LangChain RAG Intern (Similarity: 0.94)\n> Match Score: 95.4% Strong Alignment!`
    },
    {
      step: 3,
      log: `[AGENT 4: Response & Cover Letter Generator]\n> Generating tailored cover letter targeting RAG & Agentic workflows...\n> Formulating evidence-backed interview responses based strictly on candidate projects.\n✓ Cover Letter & Prep Sheet Generated.`
    },
    {
      step: 4,
      log: `[AGENT 5: Quality Assurance & PDF Exporter]\n> Running alignment verification & hallucination check...\n> Grounding Verification: 100% (No unsupported claims detected).\n> Compiling report via ReportLab PDF engine...\n✓ Executive Job Application PDF Ready for Download!`
    }
  ];

  let isRunning = false;

  simBtn.addEventListener('click', () => {
    if (isRunning) return;
    isRunning = true;
    simBtn.disabled = true;
    simBtn.innerHTML = `<ion-icon name="sync-outline" class="spin"></ion-icon> Running Multi-Agent Flow...`;

    // Reset steps
    steps.forEach(s => s.classList.remove('active', 'completed'));
    outputBox.textContent = "Initializing Multi-Agent AI Workflow...";

    let currentStep = 0;

    function executeNextStep() {
      if (currentStep > 0) {
        steps[currentStep - 1].classList.remove('active');
        steps[currentStep - 1].classList.add('completed');
      }

      if (currentStep < steps.length) {
        steps[currentStep].classList.add('active');
        outputBox.textContent = simulationLogs[currentStep].log;
        currentStep++;
        setTimeout(executeNextStep, 1300);
      } else {
        steps[steps.length - 1].classList.remove('active');
        steps[steps.length - 1].classList.add('completed');
        
        simBtn.disabled = false;
        simBtn.innerHTML = `<ion-icon name="play-circle-outline"></ion-icon> Run Simulation Again`;
        isRunning = false;
      }
    }

    setTimeout(executeNextStep, 500);
  });
}

/* ==========================================================================
   5. DYNAMIC PROJECT FILTERS & SEARCH
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const searchInput = document.getElementById('project-search');

  let activeCategory = 'all';

  function filterProjects() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const title = card.querySelector('.project-card-title').textContent.toLowerCase();
      const desc = card.querySelector('.project-card-desc').textContent.toLowerCase();
      const tags = card.getAttribute('data-tags') || '';

      const matchesCat = (activeCategory === 'all' || category.includes(activeCategory));
      const matchesSearch = !searchTerm || title.includes(searchTerm) || desc.includes(searchTerm) || tags.toLowerCase().includes(searchTerm);

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter');
      filterProjects();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterProjects);
  }
}

/* ==========================================================================
   6. PROJECT DETAIL MODAL
   ========================================================================== */
const projectDetailsData = {
  jobpilot: {
    title: "JobPilot — Multi-Agent AI Job Application Assistant",
    subtitle: "Generative AI · RAG · Vector Search · Agentic Workflows",
    tech: ["Python", "Hugging Face Transformers", "FAISS", "LangChain", "Gradio", "ReportLab"],
    image: "./assets/images/jobpilot-preview.png",
    overview: "JobPilot is an end-to-end multi-agent AI framework engineered to automate personalized job applications, evidence-based CV alignment, and custom interview preparation.",
    highlights: [
      "Multi-Agent Architecture: Specialized agents for CV Analysis, Job Requirement Decomposition, RAG Retrieval, Answer Formulation, and Quality Checking.",
      "RAG Vector Pipeline: Embeds candidate CV content into a local FAISS vector store with Hugging Face embeddings to prevent hallucinations.",
      "Local Hugging Face Models: Leverages local LLMs for private, offline inference.",
      "Gradio Interactive UI: Simple web portal for candidate document upload, live match analytics, and one-click PDF generation."
    ]
  },
  xray: {
    title: "AI-Powered Chest X-Ray Diagnosis System",
    subtitle: "Graduation Project · Computer Vision · Medical AI",
    tech: ["PyTorch", "Vision Transformers (RAD-DINO)", "MobileNetV3", "FastAPI", "RAG", "LLMs"],
    image: "./assets/images/xray-preview.png",
    overview: "An automated end-to-end medical imaging system trained on over 55,000 chest radiographs to identify 11 thoracic abnormalities with interpretable AI explanations and bilingual report generation.",
    highlights: [
      "RAD-DINO Vision Transformer: Fine-tuned state-of-the-art medical ViT backbone on 55k+ images.",
      "Attention Rollout Explainability: Visualizes exact diagnostic focus regions for radiologist trust.",
      "MobileNetV3 OOD Gatekeeper: Filters non-chest or low-quality radiographs before model inference.",
      "Bilingual RAG Chatbot: Enables interactive Arabic and English Q&A regarding diagnostic findings."
    ]
  },
  autonomous: {
    title: "Real-Time Object Detection for Autonomous Vehicles",
    subtitle: "Computer Vision · Autonomous Driving",
    tech: ["Python", "YOLO", "OpenCV", "CUDA"],
    image: "./assets/images/autonomous-preview.png",
    overview: "A high-performance object detection pipeline optimized for autonomous driving telemetry under diverse environmental and lighting conditions.",
    highlights: [
      "Real-Time Object Tracking: Detects vehicles, pedestrians, lanes, and road obstacles at high FPS.",
      "Lighting & Weather Robustness: Evaluated against low-light and harsh weather road video datasets.",
      "Inference Speed Optimization: Model quantization and tensor optimization for low-latency hardware execution."
    ]
  }
};

function initModal() {
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');
  const inspectBtns = document.querySelectorAll('.inspect-btn');

  if (!overlay || !closeBtn) return;

  function openModal(projectId) {
    const data = projectDetailsData[projectId];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-subtitle').textContent = data.subtitle;
    document.getElementById('modal-img').src = data.image;
    document.getElementById('modal-overview').textContent = data.overview;

    const techWrap = document.getElementById('modal-tech');
    techWrap.innerHTML = data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');

    const highlightsList = document.getElementById('modal-highlights');
    highlightsList.innerHTML = data.highlights.map(h => `<li><ion-icon name="checkmark-circle-outline"></ion-icon> ${h}</li>`).join('');

    overlay.classList.add('active');
  }

  inspectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project-id');
      openModal(id);
    });
  });

  closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
}

/* ==========================================================================
   7. TECHNICAL CODE TERMINAL WIDGET
   ========================================================================== */
function initTerminalTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const codeContent = document.getElementById('terminal-code');
  if (!codeContent) return;

  const codeSnippets = {
    jobpilot: `<span class="code-kw">from</span> langchain.vectorstores <span class="code-kw">import</span> FAISS
<span class="code-kw">from</span> transformers <span class="code-kw">import</span> AutoModelForCausalLM, AutoTokenizer

<span class="code-cm"># Initialize JobPilot Multi-Agent RAG Pipeline</span>
<span class="code-kw">class</span> <span class="code-fn">JobPilotAgent</span>:
    <span class="code-kw">def</span> <span class="code-fn">__init__</span>(self, model_name: <span class="code-str">"HuggingFaceH4/zephyr-7b-beta"</span>):
        self.embeddings = HuggingFaceEmbeddings(model_name=<span class="code-str">"BAAI/bge-small-en"</span>)
        self.vector_store = FAISS.load_local(<span class="code-str">"cv_index"</span>, self.embeddings)
        
    <span class="code-kw">def</span> <span class="code-fn">generate_application</span>(self, job_desc: str):
        evidence_docs = self.vector_store.similarity_search(job_desc, k=<span class="code-num">3</span>)
        prompt = self.build_grounded_prompt(job_desc, evidence_docs)
        <span class="code-kw">return</span> self.llm_generate(prompt)`,

    xray: `<span class="code-kw">import</span> torch
<span class="code-kw">import</span> timm

<span class="code-cm"># RAD-DINO Medical Vision Transformer + OOD Gatekeeper</span>
<span class="code-kw">class</span> <span class="code-fn">ChestXRayClassifier</span>(torch.nn.Module):
    <span class="code-kw">def</span> <span class="code-fn">__init__</span>(self, num_classes=<span class="code-num">11</span>):
        super().__init__()
        self.backbone = timm.create_model(<span class="code-str">'rad_dino'</span>, pretrained=<span class="code-kw">True</span>)
        self.ood_gatekeeper = MobileNetV3_Gatekeeper()
        self.classifier = torch.nn.Linear(<span class="code-num">768</span>, num_classes)
        
    <span class="code-kw">def</span> <span class="code-fn">forward</span>(self, x):
        is_valid = self.ood_gatekeeper(x)
        <span class="code-kw">if</span> <span class="code-kw">not</span> is_valid:
            <span class="code-kw">raise</span> ValueError(<span class="code-str">"Input image failed OOD quality check"</span>)
        features = self.backbone.forward_features(x)
        <span class="code-kw">return</span> torch.sigmoid(self.classifier(features))`,

    fastapi: `<span class="code-kw">from</span> fastapi <span class="code-kw">import</span> FastAPI, File, UploadFile
<span class="code-kw">import</span> uvicorn

app = FastAPI(title=<span class="code-str">"Refaat AI Engineering Inference Suite"</span>)

<span class="code-kw">@app.post</span>(<span class="code-str">"/api/v1/diagnose"</span>)
<span class="code-kw">async def</span> <span class="code-fn">diagnose_xray</span>(file: UploadFile = File(...)):
    img_bytes = <span class="code-kw">await</span> file.read()
    predictions, heatmap = model_inference(img_bytes)
    <span class="code-kw">return</span> {<span class="code-str">"status"</span>: <span class="code-str">"success"</span>, <span class="code-str">"findings"</span>: predictions, <span class="code-str">"heatmap_url"</span>: heatmap}

<span class="code-kw">if</span> __name__ == <span class="code-str">"__main__"</span>:
    uvicorn.run(app, host=<span class="code-str">"0.0.0.0"</span>, port=<span class="code-num">8000</span>)`
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const snippetKey = tab.getAttribute('data-tab');
      if (codeSnippets[snippetKey]) {
        codeContent.innerHTML = codeSnippets[snippetKey];
      }
    });
  });
}

/* ==========================================================================
   8. NAVBAR SCROLL EFFECT
   ========================================================================== */
function initNavbarScroll() {
  const header = document.querySelector('.navbar-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   9. COPY TO CLIPBOARD FEEDBACK
   ========================================================================== */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('[data-copy]');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(textToCopy).then(() => {
        const origText = btn.innerHTML;
        btn.innerHTML = `<ion-icon name="checkmark-outline"></ion-icon> Copied!`;
        setTimeout(() => {
          btn.innerHTML = origText;
        }, 2000);
      });
    });
  });
}
