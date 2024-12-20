// Theme functionality
function toggleTheme() {
  const html = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = themeToggle.querySelector('i');
  const themeText = themeToggle.querySelector('span');
  
  if (html.getAttribute('data-theme') === 'dark') {
    html.setAttribute('data-theme', 'light');
    themeIcon.className = 'fas fa-moon';
    themeText.textContent = 'Dark Mode';
    localStorage.setItem('theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
    themeIcon.className = 'fas fa-sun';
    themeText.textContent = 'Light Mode';
    localStorage.setItem('theme', 'dark');
  }
}

// Initialize theme from localStorage
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  const html = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = themeToggle.querySelector('i');
  const themeText = themeToggle.querySelector('span');

  html.setAttribute('data-theme', savedTheme);
  if (savedTheme === 'dark') {
    themeIcon.className = 'fas fa-sun';
    themeText.textContent = 'Light Mode';
  } else {
    themeIcon.className = 'fas fa-moon';
    themeText.textContent = 'Dark Mode';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme
  initializeTheme();
  
  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true
  });

  // Navbar Toggle
  const toggleMenu = document.querySelector('.toggle-menu');
  const navLinks = document.querySelector('.nav-links');

  toggleMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });


  
  // Render Team Members
  function renderTeamMembers(teamData, containerId) {
    const container = document.querySelector(`#${containerId} .members`);
    container.innerHTML = '';
    
    teamData.forEach(member => {
      const memberDiv = document.createElement('div');
      memberDiv.classList.add('member');
      memberDiv.dataset.aos = 'zoom-in';
      
      memberDiv.innerHTML = `
        <img src="${member.image || 'foto3.jpg'}" alt="${member.name}">
        <h4>${member.name}</h4>
        <p class="role">${member.role}</p>
        <p class="preview-info">${member.description.slice(0, 100)}...</p>
        <button class="expand-btn">Lihat Selengkapnya</button>
        <div class="details">
          <div class="details-content">
            <h3>Deskripsi</h3>
            <p>${member.description}</p>
            
            <h3>Keahlian</h3>
            <ul>
              ${member.skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
            
            <h3>Proyek</h3>
            <ul>
              ${member.projects.map(project => `<li>${project}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;

      // Add click handler for expand/collapse
      const expandBtn = memberDiv.querySelector('.expand-btn');
      const details = memberDiv.querySelector('.details');
      
      expandBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        details.classList.toggle('expanded');
        expandBtn.textContent = details.classList.contains('expanded') ? 
          'Tutup' : 'Lihat Selengkapnya';
      });

      container.appendChild(memberDiv);
    });
  }

  // Update About section and render teams
  const aboutSection = document.querySelector('#about p');
  aboutSection.textContent = `Website ini dibuat oleh dua kelompok yang berkolaborasi. Kelompok pertama terdiri dari ${teamPembuatWeb.length} anggota yang bertugas membuat website, sedangkan kelompok kedua terdiri dari ${teamReviewerWeb.length} anggota untuk me=review hasil dari pembuatan website ini dan memastikan tidak ada bug, serta website ini adalah sebagai salah satu syarat tugas akhir dari mata kuliah Interaksi Manusia Dan Komputer.`;
  
  renderTeamMembers(teamPembuatWeb, 'team-pembuat-web');
  renderTeamMembers(teamReviewerWeb, 'team-reviewer-web');
});
