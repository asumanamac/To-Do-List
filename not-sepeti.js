const yeniGorev = document.querySelector('.input-gorev');
const yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle');
const gorevListesi = document.querySelector('.gorev-listesi');

yeniGorevEkleBtn.addEventListener('click' , gorevEkle);
gorevListesi.addEventListener('click' , gorevSilTamamla);

document.addEventListener('DOMContentLoaded' , localStorageOku)

function gorevSilTamamla(e)
{
    const tıklanılanEleman = e.target;
    if(tıklanılanEleman.classList.contains('gorev-btn-tamamlandı'))
    {
        tıklanılanEleman.parentElement.classList.toggle('gorev-tamamlandı');
    }
   
    if(tıklanılanEleman.classList.contains('gorev-btn-sil'))
    {

        if(confirm("Are you sure"))
        {

        

        tıklanılanEleman.parentElement.classList.toggle('kaybol');

       const silinecekGorev = tıklanılanEleman.parentElement.children[0].innerText;

        localStorageSil(silinecekGorev);
        tıklanılanEleman.parentElement.addEventListener('transitionend' , function()
        {

              tıklanılanEleman.parentElement.remove();
            
        });
       
    }}
    

}


function gorevEkle(e)
{
    e.preventDefault();

    if(yeniGorev.value.length > 0){
     gorevItemOlustur(yeniGorev.value);
    
    localStorageKaydet(yeniGorev.value);
    yeniGorev.value = " ";
    }

    else
    {
        alert("Boş Görev Tanımı Yapılamaz");
    }

    
}

function localStorageArrayeDonustur()
{

    let gorevler;
    if(localStorage.getItem('gorevler')===null)
    {
        gorevler = [];
    }

    else{
        gorevler =JSON.parse(localStorage.getItem('gorevler'));
    }

    return gorevler;

}

function localStorageKaydet(yeniGorev)
{
    
    let gorevler = localStorageArrayeDonustur();
   
    gorevler.push(yeniGorev);
    localStorage.setItem('gorevler' , JSON.stringify(gorevler));
}


function localStorageOku()
{

    let gorevler;
    if(localStorage.getItem('gorevler')===null)
    {
        gorevler = [];
    }

    else{
        gorevler =JSON.parse(localStorage.getItem('gorevler'));
    }

    gorevler.forEach(function(gorev)
    {

        gorevItemOlustur(gorev);


    });

}

function gorevItemOlustur(gorev)
{
     //div olusturma
     const gorevDiv = document.createElement('div');
     gorevDiv.classList.add('gorev-item');
 
     const gorevLi = document.createElement('li');
     gorevLi.classList.add('gorev-tanım');
     gorevLi.innerText = gorev;
 
     gorevDiv.appendChild(gorevLi);
 
     //tamamlandı butonu ekle
     const gorevTamamBtn = document.createElement('btn');
     gorevTamamBtn.classList.add('gorev-btn');
     gorevTamamBtn.classList.add('gorev-btn-tamamlandı');
     gorevTamamBtn.innerHTML = '<i class="far fa-check-square"></i>';
     gorevDiv.appendChild(gorevTamamBtn);
 
       //silme butonu ekle
       const gorevSilBtn = document.createElement('btn');
       gorevSilBtn.classList.add('gorev-btn');
       gorevSilBtn.classList.add('gorev-btn-sil');
       gorevSilBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
       gorevDiv.appendChild( gorevSilBtn);
 
 
    
        //ul'ye oluşturduğumuz divi ekleyelim
 
     gorevListesi.appendChild(gorevDiv);
}

function localStorageSil(gorev)
{

    let gorevler = localStorageArrayeDonustur();
    

    //splice ile item sil
    const silinecekElemanİndex = gorevler.indexOf(gorev);

    gorevler.splice(silinecekElemanİndex,1);

    localStorage.setItem('gorevler' , JSON.stringify(gorevler));

}

