 $(document).ready(function() {// jquery 
    //coloca cursor na posicção inicial do textarea
    var textarea = document.getElementById('comment_text');
    textarea.value = '';
    //evento disparado ao clicar no button cadastrar
    $("#btn-cadastrar").on("click",function(event) {
      event.preventDefault();
      var comment = document.getElementById("comment_text").value;
      setComment(comment);//adiciona comentário
    });
 });//Fim jquery

 function getXMLHttpRequest(){
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  } else {
    return new ActiveXObject("Microsoft.XMLHTTP");
 }
 }

 /**
  *  adiciona comentario
  */
 function setComment(comment){
   /**
    * verifica se textarea esta vazio
    */
   comment = comment.trim();
   if(!comment || 0 === comment.length){
       console.log("Campo não pode estar vazio!");
       alert("Campo de comentários não pode estar vazio!");
       return;
   };
   var data = {"text": comment};
   var xhttp = getXMLHttpRequest();
   xhttp.open("POST", "/post", true);
   xhttp.timeout = 10000;
   xhttp.dataType = "json";
   xhttp.responseType = "text"
   xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
   xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
         getComments();// busca todos os comentários e atualiza a area de comentários
         console.log(`OK! status ${this.status}\n${this.responseText}`);
     }else if(this.readyState == 4 && this.status == 500){
      alert(`Erro Inesperado ${this.responseText}`);
     }
   };
   xhttp.send(JSON.stringify(data));
 }// Fim setComment


 /**
  * atualiza comentarios na pagina
  */ 
 function getComments(){ 
   var xhttp = getXMLHttpRequest();
   xhttp.open("GET", "/getcomments", true);
   xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
       console.log(this.responseText);
       var html = makeHtml(JSON.parse(this.responseText));
     }
   };
   xhttp.send();
 }//Fim getComments

 /**
  * cria html de apresentação dos comentarios na página
  */  
 function makeHtml(comments){
  let html_comments = [];
  comments.forEach(function(comment){
    var commentid = `comment_${comment.id}`
    html_comments.push(
     `<div class="row">
        <div class="col-10">
            <span id=\"${commentid}\">${comment.text }</span>
        </div>
        <div class="col-2">
            <input data-toggle="tooltip" data-placement="left" 
              title="click e espere um momento para o texto ser reproduzido!"
              onclick="saySomething(${commentid})"
              value="Ouvir" class="btn-ouvir" type="submit">
        </div>
      </div>
      </br>`
    );
  });
   
  $("#list_comments").empty();//limpa lista de comentários
  html_comments.reverse();
  //readiciona comentários
  html_comments.forEach(html => {
    $("#list_comments").append(html);
  })
 }// Fim makeHtml

 function saySomething(comment){
    comment = comment.innerHTML;
   var data = {'text':comment};
   var xhttp = getXMLHttpRequest();
   xhttp.open("POST", "/ouvir", true);
   xhttp.timeout = 10000;
   xhttp.dataType = "json";
   xhttp.responseType = "text";
   xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
   xhttp.onreadystatechange = function() {
     if (this.readyState == xhttp.DONE && this.status == 200) {
       console.log("Ok! "+ this.status);
     }else if(this.readyState == xhttp.DONE && this.status == 500){
      alert(`Não foi possivel reproduzir o audio!\n Error: ${this.status} ${this.statusText}`)
     }
   };
   xhttp.send(JSON.stringify(data));
 }//Fim saySomething
