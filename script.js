
window.addEventListener('load',()=>{
    const container = document.querySelector('.container');
    const loading = document.querySelector('.loading');

window.addEventListener('scroll', (e)=>{
    const {scrollHeight, clientHeight, scrollTop} = document.documentElement;
    // console.log( clientHeight, scrollHeight, scrollTop);
    if((clientHeight + scrollTop) >= scrollHeight - 5)
    {
        showLoading();
        console.log('reach bottom')
    }
})

const showLoading = () =>{
    loading.classList.add('show');
    setTimeout(getPost,1000);
    // getPost();
}

    const getPost = async () =>{
        const uri = `https://jsonplaceholder.typicode.com/posts/${randomData()}`;
        const userUri = 'https://randomuser.me/api/';
        
        const response = await fetch(uri);
        const postdata = await response.json();
        
        const res = await fetch(userUri);
        const userdata = await res.json();
        const data = { post : postdata, user: userdata.results[0]}
        // console.log(userdata);
        
        adddataToDOM(data)
    }
    const randomData = () => {
        return Math.floor(Math.random() *100) + 1;
    }
    
    getPost();
    getPost();
    getPost();
    
    const adddataToDOM = (data) => {
        // const box = document.querySelector('#box');
        const newEle = document.createElement('div');
        newEle.classList.add('box')
        newEle.innerHTML = `
            <h2 class="heading">${data.post.title.charAt(0).toUpperCase()+ data.post.title.slice(1) }</h2>
            <p class="content">${data.post.body}</p>
            <div class="user-info">
                <img src="${data.user.picture.large}" alt="user"/>
                <p>${data.user.name.first}</p>
            </div>
            `;
        // console.log(box)
        container.appendChild(newEle)
        loading.classList.remove('show')
    }
  
})