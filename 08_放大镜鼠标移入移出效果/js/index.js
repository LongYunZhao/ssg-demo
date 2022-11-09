// 作用：需要将所有的DOM元素对象以及相关的资源全部都加载完毕之后，再来实现的事件函数
window.onload = function () {
    navPathDataBind() // 路径导航的数据渲染
    bigClassBind() // 放大镜的移入移出效果

    /**
     * 函数作用：路径导航的数据渲染
     * 思路：
     * 1. 先获取路径导航的页面元素（navPath）
     * 2. 再来获取所需要的数据（data.js->goodData.path）
     * 3. 由于数据是需要动态产生的，那么相应的DOM元素也应该是动态产生的，含义需要根据数据的数量来进行创建DOM元素
     * 4. 在遍历数据创建DOM元素的最后一条，只创建a标签，而不创建i标签
     */
    function navPathDataBind() {
        const navPath = document.querySelector('#navPath')
        const path = goodData.path
        console.log('打印navPath元素')
        console.log(navPath)
        console.log('打印下data.js中数据')
        console.log(goodData)
        for (let i = 0; i < path.length; i++) {
            if (i === (path.length - 1)) {
                // 最后一次只创建 a标签
                const aNode = document.createElement('a')
                aNode.innerText = path[i].title
                navPath.appendChild(aNode)
            } else {
                // 创建 a标签 和 i标签
                const aNode = document.createElement('a')
                aNode.href = path[i].url
                aNode.innerText = path[i].title

                const iNode = document.createElement('i')
                iNode.innerText = '/'

                navPath.appendChild(aNode)
                navPath.appendChild(iNode)

            }
        }
    }

    /**
     * 函数作用：放大镜的移入移出效果
     * 思路：
     * 1. 获取小图框元素对象，并且设置移入事件(onmouseenter)
     * 2. 动态的创建蒙版元素以及大图框和大图片元素
     * 3. 移出时(onmouseleave)需要移除蒙版元素和大图框
     */
    function bigClassBind() {
        // 小图框元素
        const smallPicEl = document.querySelector('#smallPic')
        // 上边元素
        const leftTopEl = document.querySelector('#left-magnifier>#leftTop')

        // 设置移入事件
        smallPicEl.onmouseenter = function () {
            const mask = document.createElement('div')
            mask.className = 'mask'

            const bigPic = document.createElement('div')
            bigPic.id = 'bigPic'
            const bigImg = document.createElement('img')
            bigImg.src = 'images/b1.png'

            bigPic.appendChild(bigImg)
            smallPicEl.appendChild(mask)
            leftTopEl.appendChild(bigPic)


            //设置移动事件
            smallPicEl.onmousemove = function (event) {
                const x = event.clientX - smallPicEl.getBoundingClientRect().left - mask.offsetWidth/2 + 'px'
                const y = event.clientY - smallPicEl.getBoundingClientRect().top - mask.offsetHeight/2 + 'px'
                
                mask.style.left = x
                mask.style.top = y
            }

            // 设置移出事件
            smallPicEl.onmouseleave = function () {
                leftTopEl.removeChild(bigPic)
                smallPicEl.removeChild(mask)
            }

        }


    }
}
