(function(){
      document.documentElement.classList.add('js');
      var root=document.documentElement;
      var themeBtn=document.getElementById('themeBtn');
      var navShell=document.getElementById('navShell');
      var menuBtn=document.getElementById('menuBtn');
      var progress=document.getElementById('progress');

      function applyTheme(theme){
        root.setAttribute('data-theme',theme);
        localStorage.setItem('theme',theme);
        themeBtn.setAttribute('aria-label',theme==='dark'?'Switch to light mode':'Switch to dark mode');
        document.querySelector('meta[name="theme-color"]').setAttribute('content',theme==='dark'?'#08111d':'#f8fafc');
      }
      var saved=localStorage.getItem('theme');
      if(saved==='dark'||saved==='light') applyTheme(saved);
      else if(window.matchMedia('(prefers-color-scheme: dark)').matches) applyTheme('dark');
      themeBtn.addEventListener('click',function(){ applyTheme(root.getAttribute('data-theme')==='dark'?'light':'dark'); });

      menuBtn.addEventListener('click',function(){
        var open=navShell.classList.toggle('menu-open');
        menuBtn.setAttribute('aria-expanded',String(open));
        menuBtn.setAttribute('aria-label',open?'Close navigation':'Open navigation');
      });
      document.querySelectorAll('.nav-links a').forEach(function(link){ link.addEventListener('click',function(){ navShell.classList.remove('menu-open'); menuBtn.setAttribute('aria-expanded','false'); }); });

      function scrollProgress(){
        var total=document.documentElement.scrollHeight-window.innerHeight;
        progress.style.width=(total>0?(window.scrollY/total)*100:0)+'%';
      }
      window.addEventListener('scroll',scrollProgress,{passive:true});
      scrollProgress();

      var prefersReduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var items=document.querySelectorAll('.reveal');
      if(prefersReduce || !('IntersectionObserver' in window)){
        items.forEach(function(el){el.classList.add('is-visible');});
      } else {
        var io=new IntersectionObserver(function(entries){
          entries.forEach(function(entry){
            if(entry.isIntersecting){ entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
          });
        },{rootMargin:'0px 0px -7% 0px',threshold:.08});
        items.forEach(function(el){io.observe(el);});
      }
    })();
