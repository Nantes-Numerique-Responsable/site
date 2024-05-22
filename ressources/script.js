if (document.forms.namedItem("contactForm")) {
    document.forms.namedItem("contactForm").addEventListener('submit', function(e) {
        document.getElementById('sendMessage').disabled = true; //limit le problème des doubles clic
        e.preventDefault();

        var form = document.forms.namedItem("contactForm");
        var formData = new FormData(form); //fonction native qui mets tout dans un format prêt a etre envoyé
        xhr = new XMLHttpRequest(); //prepare la requete
        xhr.open('POST', resturl + 'contactForm', true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                document.getElementById('sendMessage').disabled = false;
                document.getElementById('sendMessage').classList.add("hiddenSubmitButton");
                document.getElementById('ResponseMessage').classList.add("showResponseMessage");
            }
        };
        xhr.send(formData);
    });
}


if (document.forms.namedItem("newsletterForm")) {
    console.log('test');
    document.forms.namedItem("newsletterForm").addEventListener('submit', function(e) {
        document.getElementById('sendEmail').disabled = true; //limit le problème des doubles clic
        e.preventDefault();

        var form = document.forms.namedItem("newsletterForm");
        var formData = new FormData(form);
        xhr = new XMLHttpRequest();
        xhr.open('POST', resturl + 'newsletterForm', true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                document.getElementById('sendEmail').disabled = false;
                document.getElementById('ResponseMessageNewsletter').classList.add("showResponseMessage");
                document.getElementById('emailNewsletter').value='';
                document.getElementById('newsInput').classList.add("newsletterDisapear");
            }
        };
        xhr.send(formData);
    });
}



// if (document.forms.namedItem("footer-newslettter-form")) {
//     document.forms.namedItem("footer-newslettter-form").addEventListener('submit', function(e) {
//         document.getElementById('sendMessageNewsletter').disabled = true; //limit le problème des doubles clic
//         e.preventDefault();

//         var form = document.forms.namedItem("footer-newslettter-form");
//         var formData = new FormData(form);
//         xhr = new XMLHttpRequest();
//         xhr.open('POST', resturl + 'formNewsletter', true);
//         xhr.onload = function() {
//             if (xhr.status === 200) {
//                 document.getElementById('sendMessageNewsletter').disabled = false;
//                 document.getElementById('sendMessageNewsletter').classList.add("hiddenSubmitButton");
//                 document.getElementById('ResponseMessageNewsletter').innerText = xhr.response.replace('"', '').replace('"', '');
//                 document.getElementById('ResponseMessageNewsletter').classList.add("showResponseMessage");
//             }
//         };
//         xhr.send(formData);
//     });
// }
/*

Animate header.php (see header.scss)

File structure :
------------------
1 - Open & Close menu
------------------
2 - Detect click on #overlay
------------------
3 - Scroll detection
------------------
// 4 - Modif topbar background on scroll

*/

// 1 - Open & Close menu (for mobile devices)
function toggleMenu() {
    document.getElementById("menu").classList.toggle("menu-open");
}

// 2 - Detect click on #overlay (for mobile menu)
// When we click outside of the mobile menu, the menu disappears
// We use #overlay to detect the click

/*document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("overlay").addEventListener("click", function(e) {
        toggleMenu ();
    });
});*/

// 3 - Scroll detection
//topbar gets sticky on scroll
var scroll = document.getElementById("menu");
var menu = document.getElementById("menu");
var sticky = 0;
var isWhite = menu.dataset.white;

window.onscroll = function() {

    if (window.pageYOffset > sticky) {
        menu.classList.add("menu-small");
    } else {
        menu.classList.remove("menu-small");
    }
};


// 4 - Modif topbar background on scroll

/*window.onscroll = function() {

    var menu = document.getElementById("scroll-anchor");
    var header = document.getElementById("topbar-wrapper");
    var sticky = menu.offsetTop;

    if (window.pageYOffset > sticky) {
        header.classList.add("scroll");
        window.onscroll = function() { return; };
    } else {
        header.classList.remove("scroll");
    }
};*/

// var derniere_position_de_scroll_connue = 0;
// var ticking = false;
// var menu = document.getElementById("scroll-anchor");
// var header = document.getElementById("topbar-wrapper");
// var sticky = menu.offsetTop;

// window.addEventListener('scroll', function(e) {
//     if (!ticking) {
//         window.setTimeout(function() {
//             ticking = false;
//             if (window.scrollY > sticky) {
//                 header.classList.add("scroll");
//             } else {
//                 header.classList.remove("scroll");
//             }
//         }, 300); //fréquence du scroll
//     }
//     ticking = true;
// });
document.addEventListener('DOMContentLoaded', function() {
    var els = document.getElementsByClassName("btn-modale");
    Array.prototype.forEach.call(els, function(el) {
        el.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();

            var modale = document.createElement("div");
            modale.classList.add("modale");
            modale.id = el.dataset.uniqId;

            var button = document.createElement("button");
            button.classList.add("closeModale");
            button.onclick = function() { document.getElementById(el.dataset.uniqId).remove(); };
            button.appendChild(document.createTextNode("X"));
            modale.appendChild(button);

            var modaleContent = document.createElement("div");
            modaleContent.id = 'modaleContent' + el.dataset.uniqId;
            modaleContent.classList.add("modaleContent");
            modale.appendChild(modaleContent);

            document.body.appendChild(modale);

            for (var key in iframe) {
                // check if the property/key is defined in the object itself, not in parent
                if (iframe.hasOwnProperty(key)) {
                    if (key == el.dataset.uniqId) {
                        document.getElementById('modaleContent' + el.dataset.uniqId).innerHTML = iframe[key];
                        modale.classList.add("active");
                    }
                }
            }
        });
    });
});
// organise - infinit s roll 
if (document.querySelector('#infinite-list')) {
    var base_url = window.location.href;
    var elm = document.querySelector('#infinite-list');
    // loader = document.querySelector('#loaderPost');
    var page = elm.dataset.page;
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    load = false;
    ticking = false;
    window.addEventListener('scroll', function(e) {
        if (!ticking) {
            window.setTimeout(function() {
                ticking = false;
                //Do something
                if (!load && (elm.offsetTop + elm.clientHeight) < (window.scrollY + height)) { //scroll > bas de infinite-list
                    //inserer les éléments suivants
                    if (page >= elm.dataset.nbPageMax) {
                        console.log(load);
                    } else {
                        load = true;
                        readMorePost();
                    }
                }
            }, 300); //fréquence du scroll
        }
        ticking = true;
    });
}


function readMorePost() {
    page++;
    // loader.classList.add("active");
    var formData = new FormData();
    formData.append("page", page);
    formData.append("cpt", elm.dataset.cpt);
    formData.append("taxo", elm.dataset.taxo);
    formData.append("taxo_tag_var", elm.dataset.taxo_tag);

    console.log("readMorePost");

    xhr = new XMLHttpRequest();
    xhr.open('POST', resturl + 'scroll', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            load = false;
            console.log(xhr.response);
            elm.insertAdjacentHTML('beforeend', xhr.response);
            // window.history.replaceState("", "", elm.dataset.url + "page/" + page + "/");
            // loader.classList.remove("active");
        }
    };
    xhr.send(formData);
}


// filter on tpl-post
if(document.getElementById('form-filter')){
    var filter_category = document.getElementById('filter-category');
    filter_category.addEventListener('change', function(){
        document.getElementById('form-filter').submit();
    });
}


// Ajax to load more post 
if (document.getElementById("archive-listing")) {  

    var page = 1;   
    
    if(document.getElementById("more_post")) {
        var btn_load_more = document.getElementById("more_post");

        btn_load_more.addEventListener("click", function() {
            page++;   
            // console.log(page);
            // console.log(max_num_pages);
            if (page >= max_num_pages) { 
                btn_load_more.style.display = 'none';
            }
            var formData = new FormData();
            //ajout variable ds formulaire
            formData.append("page", page);
            formData.append("category-slug", category);
            xhr = new XMLHttpRequest();
            xhr.open('POST', resturl+'read_more_post');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    elm = document.getElementById('display-posts');
                    elm.insertAdjacentHTML('beforeend', xhr.response);
                    // console.log(xhr.response);
                }
            };
            xhr.send(formData);
        });  
    }
    
}

// Ajax to load more ressources 
if (document.getElementById("archive-listing-ressources")) {   

    var page = 1;     
    
    if(document.getElementById("more_ressources")) {
        var btn_load_more = document.getElementById("more_ressources");

        btn_load_more.addEventListener("click", function() {
            page++;   
            // console.log(page);
            // console.log(max_num_pages);
            if (page >= max_num_pages) { 
                btn_load_more.style.display = 'none';
            }
            var formData = new FormData();
            //ajout variable ds formulaire
            formData.append("page", page);
            formData.append("category-slug", category);
            xhr = new XMLHttpRequest();
            xhr.open('POST', resturl+'read_more_ressources');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    elm = document.getElementById('display-ressources');
                    elm.insertAdjacentHTML('beforeend', xhr.response);
                    addModaleListener();
                    // console.log(xhr.response);
                }
            };
            xhr.send(formData);
        });   
    }
    
}



document.addEventListener('DOMContentLoaded', function() {
    var els = document.getElementsByClassName("JSrslink");
    var heightScreen = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var widthScreen = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    Array.prototype.forEach.call(els, function(el) {
        el.addEventListener("click", function(e) {
            e.stopPropagation();
            e.preventDefault();
            var width = 320,
                height = 400,
                left = (widthScreen - width) / 2,
                top = (heightScreen - height) / 2,
                url = this.href,
                opts = 'status=1' +
                ',width=' + width +
                ',height=' + height +
                ',top=' + top +
                ',left=' + left;
            window.open(url, 'myWindow', opts);
            return false;
        });
    });

    copyLink = document.getElementsByClassName('copyLink');
    Array.prototype.forEach.call(copyLink, function(el) {
        el.addEventListener("click", function(e) {
            e.stopPropagation();
            copyLinkValue = el.getElementsByClassName('copyLinkValue');
            copyLinkValue[0].focus();
            copyLinkValue[0].select();
            document.execCommand("copy");
            el.classList.add('active');
        });

    });



});