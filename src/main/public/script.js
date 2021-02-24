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
   var data = {"comment_text": comment};
   var xhttp = new XMLHttpRequest();
   xhttp.open("POST", "/post", true);
   xhttp.timeout = 10000;
   xhttp.dataType = "json";
   xhttp.responseType = "text"
   xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
   xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
         getComments();// busca todos os comentários e atualiza a página
         console.log("OK! status "+ this.status);
     }else if(this.status == 500){
      alert(`Erro Inesperado ${this.responseText}`);
     }
   };
   xhttp.send(JSON.stringify(data));
 }// Fim setComment


 /**
  * atualiza comentarios na pagina
  */ 
 function getComments(){ 
   var xhttp = new XMLHttpRequest();
   xhttp.open("GET", "/getcomments", true);
   xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
       console.log(this.responseText);
       var html = makeHtml(this.responseText);
     }
   };
   xhttp.send();
 }//Fim getComments

 /**
  * cria html de apresentação dos comentarios na página
  */  
 function makeHtml(comments){
  comments = JSON.parse(comments);
  var html_comments = "";
  comments.forEach(comment => {
    var commentid = `comment_${comment.id}`
    html_comments +=
     `<div class="row">
        <div class="col-10">
            <span id=\"${commentid}\">${comment.comment_text }</span>
        </div>
        <div class="col-2">
            <input data-toggle="tooltip" data-placement="left" 
              title="click e espere um momento para o texto ser reproduzido!"
              onclick="saySomething(${commentid})"
              value="Ouvir" class="btn-ouvir" type="submit">
        </div>
      </div>
      </br>`
      });
      $("#list_comments").empty();
      $("#list_comments").html(html_comments);
 }

 function saySomething(comment){
    comment = comment.innerHTML;
   var data = {'text':comment};
   var xhttp = new XMLHttpRequest();
   xhttp.open("POST", "/ouvir", true);
   xhttp.timeout = 10000;
   xhttp.dataType = "json";
   xhttp.responseType = "text";
   xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
   xhttp.onreadystatechange = function() {
     if (this.readyState == xhttp.DONE && this.status == 200) {
       console.log("Ok! "+ this.status);
     }else if(this.readyState == xhttp.DONE ){
      alert(`Não foi possivel reproduzir o audio!\n Error: ${this.status} ${this.statusText}`)
     }
   };
   xhttp.send(JSON.stringify(data));
 }//Fim saySomething
