class Blog {
  constructor() {
    this.setInitVariables();
    this.registerEvents();
    this.likedSet = new Set();
  }

  setInitVariables() {
    this.blogList = document.querySelector('.list-posts ul');
  }

  registerEvents() {
    const startBtn = document.querySelector('.start');
    const dataURL = 'https://jsonplaceholder.typicode.com/posts';

    startBtn.addEventListener('click', () => {
      this.setInitData(dataURL);
      startBtn.classList.add('hide');
    });

    this.blogList.addEventListener('click', ({ target }) => {
      const targetClassName = target.className;
      if (targetClassName !== 'like' && targetClassName !== 'unlike') return;

      const postTitle = target.parentNode.getElementsByTagName('h3')[0]
        .textContent;

      if (targetClassName === 'unlike') {
        target.className = 'like';
        target.innerText = '♡';
        this.likedSet.delete(postTitle);
      } else {
        target.className = 'unlike';
        target.innerText = '♥';
        this.likedSet.add(postTitle);
      }

      // Update Liked List on display.
      this.updateLikedList();
    });
  }

  updateLikedList() {
    const ul = document.querySelector('.list-like ul');
    let likedSum = '';

    this.likedSet.forEach((v) => {
      likedSum += `<li> ${v} </li>`;
    });

    ul.innerHTML = likedSum;
  }

  setInitData(dataURL) {
    this.getData(dataURL);
  }

  getData(dataURL) {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', () => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => {
          const list = json;
          this.insertPosts(list);
        });
    });
    oReq.open('GET', dataURL);
    oReq.send();
  }

  insertPosts(list) {
    list.forEach((v) => {
      this.blogList.innerHTML += `
				 <li>
            <h3>${v.title}</h3>
            <p>${v.body}</p>
				 	<span class="like">♡</span>
				 </li>
				 `;
    });
  }
}

const myBlog = new Blog();
