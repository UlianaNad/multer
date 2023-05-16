console.log("work!");

const elPrev = document.querySelector('.prev');

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    //console.log(formData.get('first_name'));
    const result = axios.post('/new_profile', formData);

    const photo = formData.get('photo');
    const reader = new FileReader();

    const readFile = await new Promise((resolve) => {
        reader.onload = (ev) => {
            const {result} = ev.target;
            resolve(result);
        }
        reader.readAsDataURL(photo);
    });
    elPrev.src = readFile;
 
    
});

