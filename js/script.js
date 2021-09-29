const but_found = document.getElementById('found');

let linamear = document.getElementsByClassName('liname');
let namear = document.getElementsByClassName('name');


let lifoundar = document.getElementsByClassName('lifound');
let foundar = document.getElementsByClassName('found');


let ligroupar = document.getElementsByClassName('ligroup');
let groupar = document.getElementsByClassName('group');



document.addEventListener('DOMContentLoaded', function(){

    
    
    for (let i = 0; i < linamear.length; i++) {
        if(i>0){
            linamear[i].classList.add('hidden');
            lifoundar[i].classList.add('hidden');
            ligroupar[i].classList.add('hidden');
        }
        namear[i].id = 'nameid' + i;
        foundar[i].id = 'foundid' + i;
        groupar[i].id = 'groupid' + i;

        console.log('ok');
    }
});

let index = 0;
but_found.onclick = function () {
    // console.log(index);
    
    // let liarr = document.getElementsByTagName('li');
    

    if(index>0) {
        linamear[index-1].classList.add('hidden');
        lifoundar[index-1].classList.add('hidden');
        ligroupar[index-1].classList.add('hidden');
        linamear[index].classList.toggle('hidden');
        lifoundar[index].classList.toggle('hidden');
        ligroupar[index].classList.toggle('hidden');
    }
    let thisname = document.getElementById('nameid'+index);
    let thisfound = document.getElementById('foundid'+index);
    let thisgroup = document.getElementById('groupid'+index);

    thisname.value = 'new name';
    thisfound.value = 'new foun-request';
    thisgroup.value = 'new group-name';

    index++;
    if(index>linamear.length-1) but_found.disabled = true;
}


