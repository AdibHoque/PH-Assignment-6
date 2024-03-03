const articleContainer = document.getElementById("article-container")
const markAsReadContainer = document.getElementById("markAsRead-container")
const latestPosts = document.getElementById("latest-posts")
loadAll()
loadLatest()

class cardGen {
  constructor(id, category, image, isActive, title, author, description, comment_count, view_count, posted_time) {
    this.id = id;
    this.category = category;
    this.image = image;
    this.isActive = isActive;
    this.title = title;
    this.author = author;
    this.description = description;
    this.comment_count = comment_count;
    this.view_count = view_count;
    this.posted_time = posted_time;
  }
  articleCard() {
    return `<div class="bg-[#F3F3F5] hover:bg-[#797DFC1A] border border-white hover:border-[#797DFC] p-3 md:p-5 lg:p-10 rounded-3xl flex gap-3 lg:gap-6 w-full">
    <div class="indicator">
      <span class="bg-${this.isActive ? 'green' : 'red'}-500 indicator-item badge"></span>
      <div
        class="grid max-sm:w-14 max-sm:h-14 w-20 h-20 bg-[url('${this.image}')] bg-cover place-items-center rounded-2xl"
      ></div>
    </div>
    <div class="space-y-4 w-full">
      <div
        class="flex justify-between md:justify-start md:gap-x-5 lg:gap-x-5 font-inter font-medium text-sm text-[#12132DCC]"
      >
        <p># ${this.category}</p>
        <p>Author : ${this.author.name}</p>
      </div>
      <h4 class="text-xl font-bold font-mulish text-[#12132D]">
        ${this.title}
      </h4>
      <p class="font-inter text-[#12132D99] w-full">
        ${this.description}
      </p>
      <hr class="my-4 border border-dashed" />
      <div class="flex items-center justify-between ">
        <div
          class="flex gap-x-2 md:gap-x-5 font-inter font-medium text-sm text-[#12132D99]"
        >
          <p><i class="fa-regular fa-message-lines"></i> ${this.comment_count}</p>
          <p><i class="fa-regular fa-eye"></i> ${this.view_count}</p>
          <p><i class="fa-regular fa-clock"></i> ${this.posted_time} min</p>
        </div>
        <button id="${this.id}" onclick='markAsRead("${this.title.replace("'", "&#39;")}", "${this.view_count}")' class="btn btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
        >
          <g clip-path="url(#clip0_57_457)">
            <path
              d="M13.9998 0C6.26805 0 9.15527e-05 6.26814 9.15527e-05 13.9999C9.15527e-05 21.7314 6.26805 28 13.9998 28C21.7315 28 27.9999 21.7314 27.9999 13.9999C27.9999 6.26814 21.7315 0 13.9998 0ZM14 4.91741L22.2847 10.0835H5.71542L14 4.91741ZM22.3879 18.333H22.3871C22.3871 19.1616 21.7155 19.8331 20.887 19.8331H7.1131C6.28447 19.8331 5.61303 19.1615 5.61303 18.333V10.4122C5.61303 10.3245 5.62199 10.2393 5.63655 10.1556L13.552 15.0914C13.5617 15.0975 13.5721 15.1016 13.5821 15.1072C13.5925 15.113 13.6032 15.1186 13.6138 15.1239C13.6697 15.1527 13.7273 15.176 13.7862 15.1912C13.7923 15.1929 13.7983 15.1936 13.8044 15.195C13.869 15.2102 13.9344 15.2197 13.9998 15.2197H14.0002C14.0007 15.2197 14.0012 15.2197 14.0012 15.2197C14.0665 15.2197 14.1319 15.2105 14.1965 15.195C14.2026 15.1935 14.2086 15.1929 14.2147 15.1912C14.2735 15.176 14.3309 15.1527 14.3871 15.1239C14.3977 15.1186 14.4084 15.113 14.4188 15.1072C14.4287 15.1016 14.4392 15.0975 14.4489 15.0914L22.3644 10.1556C22.3789 10.2393 22.3879 10.3244 22.3879 10.4122V18.333Z"
              fill="#10B981"
            />
          </g>
          <defs>
            <clipPath id="clip0_57_457">
              <rect width="28" height="28" fill="white" />
            </clipPath>
          </defs>
        </svg>
        </button>
      </div>
    </div>
  </div>`
  }
}

async function loadAll() {
  const data = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
  const body = await data.json()
  body.posts.forEach(post => {
    const articleCardGen = new cardGen(post.id, post.category, post.image, post.isActive, post.title, post.author, post.description, post.comment_count, post.view_count, post.posted_time)
    const articleCard = articleCardGen.articleCard()
    articleContainer.innerHTML += articleCard;
  });
}
async function loadbySearch(search) {
  const data = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${search}`)
  const body = await data.json()
  if (body.posts.length == 0) return articleContainer.innerHTML = `<div class="w-full flex items-center justify-center">
  <h4 class="text-xl font-bold font-mulish text-[#12132D]">
  No posts found!!!
  </h4>
</div> `;
  body.posts.forEach(post => {
    const articleCardGen = new cardGen(post.id, post.category, post.image, post.isActive, post.title, post.author, post.description, post.comment_count, post.view_count, post.posted_time)
    const articleCard = articleCardGen.articleCard()
    articleContainer.innerHTML += articleCard;
  });
}
async function loadLatest() {
  const data = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`)
  const body = await data.json()
  body.forEach(p => {
    const date = p.author?.posted_date || "No publish date"
    const designation = p.author?.designation || "Unknown"
    latestPosts.innerHTML += ` <div class="card bg-white rounded-2xl border border-[#12132D26]">
    <figure class="px-5 pt-5">
      <img
        src="${p.cover_image}"
        alt="Post"
        class="rounded-xl"
      />
    </figure>
    <div class="items-start text-left card-body">
      <p class="font-inter text-[#12132D99]">
        <i class="fa-light fa-calendar"></i> ${date}
      </p>
      <h2 class="font-extrabold card-title font-mulish">
        ${p.title}
      </h2>
      <p class="text-[#12132D99] font-inter">
        ${p.description}
      </p>
      <div class="flex mt-3 gap-x-4">
        <div class="avatar">
          <div class="w-12 rounded-full">
            <img
              src="${p.profile_image}"
            />
          </div>
        </div>
        <div>
          <h2 class="text-[#12132D] font-mulish font-bold">
            ${p.author.name}
          </h2>
          <p class="font-mulish text-[#12132D99] text-sm">
            ${designation}
          </p>
        </div>
      </div>
    </div>
  </div>`
  })

}

function markAsRead(title, views) {
  const newMark = `<div
  class="flex items-center justify-between p-6 bg-white rounded-3xl"
>
  <h3
    class="text-base font-semibold font-mulish text-[#12132D]"
  >
    ${title}
  </h3>
  <p
    class="font-inter font-medium text-sm text-[#12132D99]"
  >
    <i class="fa-regular fa-eye"></i> ${views}
  </p>
</div>`
  const markCount = document.getElementById("markCount")
  markCount.innerText = parseInt(markCount.innerText) + 1;
  markAsReadContainer.innerHTML += newMark;

}

function search() {
  const searchTerm = document.getElementById("search")
  const articleContainer = document.getElementById("article-container")
  articleContainer.innerHTML = `<div class="w-full flex items-center justify-center">
  <span id="spinnn" class="loading loading-spinner loading-lg w-28"></span>
</div>`
  articleContainer.scrollIntoView({ behavior: 'smooth' });
  setTimeout(function () {
    articleContainer.innerHTML = "";
    loadbySearch(searchTerm.value);
  }, 2000);
}