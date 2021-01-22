let x = JSON.parse(localStorage.getItem(`x`))
let liArray =x || [
    {
        url:"https://www.acfun.cn",
        logo:`A`,
    },
    {
        url:"https://www.bilibili.com",
        logo:`B`
    }
]
const simplifyString = (url) => {
    return url.replace(`http://`, '')
        .replace(`https://`, '')
        .replace(`www.`, '')
        .replace(/\/.*/, '')

}
const renderLiArray =()=>{
    $('li:not(.lastLi)').remove()
    liArray.forEach((e, index)=>{
        let $li = $(`
            <li>
                <div class="site">
                    <div class="siteLogo">
                        ${e.logo}
                    </div>
                    <div class="link">${simplifyString(e.url)}</div>
                    <div class="delete">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-delete"></use>
                        </svg>
                    </div>
                </div>
        </li>
    `).insertBefore('.lastLi')
        $li.on('click', '.site', ()=>{
            window.open(e.url)
        })
        $li.on('click', '.delete',(e)=>{
            e.stopPropagation()
            liArray.splice(index,1)
            renderLiArray()
        })
    })

}
renderLiArray()
$('.addButton').on("click",(e)=>{
    let  result = window.prompt("请输入:")
    if (result.slice(0,4) !== `http`){
        result = `https://`+result
    }
    liArray.push({
        url:result,
        logo:simplifyString(result)[0].toUpperCase(),
    })

    renderLiArray()
})
window.onbeforeunload = ()=>{
    let liArrayString = JSON.stringify(liArray)
    localStorage.setItem(`x`, liArrayString)
}