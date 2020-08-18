const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const userPref = sessionStorage.getItem('theme');
if(userPref === 'light') {
  document.body.className = '';
} else if (userPref === 'dark' || prefersDarkScheme.matches) {
  document.body.className = 'dark-theme';
} else {
  document.body.className = '';
}

function toggleTheme() {
  if(document.body.className == '') {
    document.body.className = 'dark-theme';
    sessionStorage.setItem('theme', 'dark')
  } else {
    document.body.className = '';
    sessionStorage.setItem('theme', 'light')
  }
}