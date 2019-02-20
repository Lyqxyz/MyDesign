let Mock = require('mockjs')

let Random = Mock.Random

export {Random}

export default ()=>{
    Mock.mock('http://localhost:8080/api/a',{
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'list|1-10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1
        }]
    })

    Mock.mock('http://localhost:8080/api/b',{
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'list|1-10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1
        }]
    })

    Mock.mock('http://localhost:8080/api/c',{
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'images|4': [{'id|+1': 1,'url':Random.image('360x200', '#ffcc33', '#FFF', 'png', '!')}]
    })


}

