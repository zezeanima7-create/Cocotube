const CocoTube = (() => {
  const videos = [
    {id:"ScMzIvxBSi4",title:"Aprenda algo novo hoje: vídeo de demonstração",channel:"CocoTube Aprender",views:"12 mil visualizações",age:"há 2 dias",duration:"10:24",category:"Aprendizado",desc:"Vídeo de demonstração para testar o player do CocoTube."},
    {id:"ysz5S6PUM-U",title:"Paisagens incríveis e natureza",channel:"Mundo Natural",views:"8,2 mil visualizações",age:"há 1 semana",duration:"05:18",category:"Natureza",desc:"Uma seleção de imagens de natureza."},
    {id:"jfKfPfyJRdk",title:"Música ao vivo para relaxar",channel:"Lofi Radio",views:"2,1 mi visualizações",age:"ao vivo",duration:"AO VIVO",category:"Música",desc:"Transmissão de música incorporada do YouTube."},
    {id:"aqz-KE-bpKQ",title:"Vídeo de teste em alta qualidade",channel:"Tech Lab",views:"45 mil visualizações",age:"há 3 semanas",duration:"02:12",category:"Tecnologia",desc:"Vídeo de demonstração do player."},
    {id:"M7lc1UVf-VE",title:"Como funciona um player de vídeo",channel:"Programação Fácil",views:"3,4 mil visualizações",age:"há 4 dias",duration:"04:35",category:"Aprendizado",desc:"Demonstração de vídeo incorporado."},
    {id:"ScMzIvxBSi4",title:"Gameplay: conhecendo novos jogos",channel:"Canal Gamer",views:"19 mil visualizações",age:"há 5 dias",duration:"12:09",category:"Jogos",desc:"Conteúdo de demonstração para a categoria de jogos."}
  ];
  const shorts = [
    {id:"ScMzIvxBSi4",title:"Dica rápida para o seu dia"},
    {id:"ysz5S6PUM-U",title:"Natureza em poucos segundos"},
    {id:"M7lc1UVf-VE",title:"Tecnologia explicada"},
    {id:"jfKfPfyJRdk",title:"Som para relaxar"}
  ];
  const $ = (selector) => document.querySelector(selector);
  const read = (key) => { try { return JSON.parse(localStorage.getItem("coco_"+key)) || []; } catch { return []; } };
  const write = (key,value) => localStorage.setItem("coco_"+key,JSON.stringify(value));
  let page="home", category="Todos", query="";
  const content=$("#content"), dialog=$("#videoDialog");

  function toast(message){const node=$("#toast");node.textContent=message;node.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>node.classList.remove("show"),2200);}
  function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
  function card(video){const thumb="https://img.youtube.com/vi/"+video.id+"/hqdefault.jpg";return '<article class="video-card" data-video="'+video.id+'"><div class="thumbnail"><img loading="lazy" src="'+thumb+'" alt=""><span class="duration">'+video.duration+'</span></div><div class="video-info"><div class="channel-avatar">'+escapeHTML(video.channel[0])+'</div><div><p class="video-title">'+escapeHTML(video.title)+'</p><div class="video-meta">'+escapeHTML(video.channel)+'<br>'+escapeHTML(video.views)+' · '+escapeHTML(video.age)+'</div></div></div></article>';}
  function render(){
    document.querySelectorAll(".nav-item").forEach(button=>button.classList.toggle("active",button.dataset.page===page));
    $("#chips").classList.toggle("hidden",page!=="home");
    if(page==="shorts"){content.innerHTML='<h2 class="section-title">Shorts</h2><div class="shorts-grid">'+shorts.map(item=>'<article class="short-card" data-video="'+item.id+'"><img loading="lazy" src="https://img.youtube.com/vi/'+item.id+'/hqdefault.jpg" alt=""><p>'+escapeHTML(item.title)+'</p></article>').join("")+'</div>';return;}
    let list=[...videos];
    if(page==="history"||page==="liked"||page==="saved"){const key={history:"history",liked:"liked",saved:"saved"}[page];list=read(key).map(id=>videos.find(video=>video.id===id)).filter(Boolean);}
    if(page==="subscriptions")list=videos.filter(video=>read("subs").includes(video.channel));
    if(page==="channel"){content.innerHTML='<div class="channel-banner"><h2>🥥 Meu canal</h2><p class="subtle">Seu espaço para publicar e organizar vídeos no CocoTube.</p><button class="pill-button" id="editChannel">Editar nome do canal</button></div><h2 class="section-title">Vídeos de demonstração</h2><div class="video-grid">'+videos.slice(0,2).map(card).join("")+'</div>';return;}
    if(page==="home"&&category!=="Todos")list=list.filter(video=>video.category===category);
    if(query)list=list.filter(video=>(video.title+" "+video.channel+" "+video.category).toLowerCase().includes(query.toLowerCase()));
    content.innerHTML=list.length?'<div class="video-grid">'+list.map(card).join("")+'</div>':'<div class="empty-state"><h2>Nenhum vídeo encontrado</h2><p>Tente outra pesquisa ou explore outras categorias.</p></div>';
  }
  function showVideo(id){
    const video=videos.find(item=>item.id===id)||{id,title:"Short do CocoTube",channel:"CocoTube",desc:"Vídeo incorporado do YouTube."};
    write("history",[id,...read("history").filter(item=>item!==id)].slice(0,60));
    const liked=read("liked").includes(id),saved=read("saved").includes(id),subscribed=read("subs").includes(video.channel);
    $("#videoDetails").innerHTML='<div class="player"><iframe src="https://www.youtube-nocookie.com/embed/'+encodeURIComponent(id)+'?autoplay=1&rel=0" title="Player CocoTube" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div><h2>'+escapeHTML(video.title)+'</h2><div class="video-meta">'+escapeHTML(video.channel)+' · '+escapeHTML(video.views||"")+'</div><div class="video-actions"><button class="pill-button '+(liked?"active":"")+'" id="likeAction">'+(liked?"♥ Curtido":"♡ Curtir")+'</button><button class="pill-button '+(saved?"active":"")+'" id="saveAction">'+(saved?"✓ Salvo":"▱ Assistir mais tarde")+'</button><button class="pill-button '+(subscribed?"active":"")+'" id="subscribeAction">'+(subscribed?"Inscrito":"＋ Inscrever-se")+'</button></div><div class="description">'+escapeHTML(video.desc||"Vídeo incorporado.")+'<br><small>O vídeo é hospedado pelo YouTube. O CocoTube exibe o player incorporado.</small></div><h3>Comentários neste dispositivo</h3><div id="comments"></div><form class="comment-form" id="commentForm"><input id="commentInput" maxlength="400" placeholder="Adicione um comentário..." required><button class="pill-button">Comentar</button></form>';
    dialog.showModal();
    $("#likeAction").onclick=()=>toggle("liked",id);
    $("#saveAction").onclick=()=>toggle("saved",id);
    $("#subscribeAction").onclick=()=>toggle("subs",video.channel);
    $("#commentForm").onsubmit=(event)=>{event.preventDefault();const input=$("#commentInput"),text=input.value.trim();if(!text)return;const comments=read("comments");comments.push({id,text});write("comments",comments);input.value="";renderComments(id);};
    renderComments(id);
  }
  function toggle(key,value){let values=read(key);values=values.includes(value)?values.filter(item=>item!==value):[value,...values];write(key,values);const current=$("#videoDetails iframe")?.src.match(/embed\/([^?]+)/)?.[1];if(current)showVideo(current);toast("Preferência salva neste dispositivo.");}
  function renderComments(id){const node=$("#comments");if(!node)return;const comments=read("comments").filter(item=>item.id===id);node.innerHTML=comments.length?comments.map(item=>'<div class="comment"><b>Você</b><br>'+escapeHTML(item.text)+'</div>').join(""):'<p class="subtle">Ainda não há comentários.</p>';}
  function setPage(next){page=next;query="";$("#searchInput").value="";render();}
  $("#searchForm").addEventListener("submit",event=>{event.preventDefault();query=$("#searchInput").value.trim();page="home";render();});
  document.querySelectorAll(".chip").forEach(button=>button.addEventListener("click",()=>{category=button.dataset.category;document.querySelectorAll(".chip").forEach(chip=>chip.classList.toggle("active",chip===button));setPage("home");}));
  document.querySelectorAll(".nav-item").forEach(button=>button.addEventListener("click",()=>{if(button.dataset.category){category=button.dataset.category;document.querySelectorAll(".chip").forEach(chip=>chip.classList.toggle("active",chip.dataset.category===category));setPage("home");}else setPage(button.dataset.page);}));
  content.addEventListener("click",event=>{const item=event.target.closest("[data-video]");if(item)showVideo(item.dataset.video);if(event.target.id==="editChannel"){const name=prompt("Nome do seu canal:","Meu canal");if(name)toast("Nome alterado nesta demonstração: "+name);}});
  $("#closeDialog").addEventListener("click",()=>dialog.close());
  dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close();});
  $("#historyQuick").addEventListener("click",()=>setPage("history"));
  $("#menuToggle").addEventListener("click",()=>$("#sidebar").classList.toggle("hidden"));
  $("#profileButton").addEventListener("click",()=>toast("Perfil local de demonstração. Login real será integrado ao backend."));
  render();
  return {render,showVideo};
})();