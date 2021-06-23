const express = require('express')
const app = express()

const tasks = []
let id = 1

app.use(express.json())//看看有没有body，如果有的话变成对象放在req.body中；
app.get('/', (req, res) => {
    res.send('Practice!')
})



app.post('/tasks', (req, res) => {
    const { des } = req.body
    let task = { id: id++, des: des, done: false }
    tasks.push(task)
    res.send(task)
})//实现post操作

app.get('/tasks/:id', (req, res) => {
    const { id } = req.params
    let task = tasks.find(i => i.id === Number(id))
    if (!task) {
        return res.sendStatus(404)
    }
    return res.json(task)
})
app.put('/tasks/:id',(req,res)=>{
    const {id}=req.params
    const {des, done}=req.body
    let task = tasks.find(i => i.id === Number(id))
    if (!task) {
        return res.sendStatus(404)
    }
    const newTask={
        id:Number(id),
        des:des||task.des,
        done:!!done||task.done
    }
    const taskIndex=tasks.findIndex((i)=>i.id===Number(id))
    tasks[taskIndex]=newTask
    return res.json(newTask)
})
app.get('/tasks', (req, res) => {
    const tasks = req.body
    res.send(tasks)
})//查找所有的tasks

app.delete('/tasks/:id',(req,res)=>{
    const {id}=req.params
    let taskIndex=tasks.findIndex(i=>i.id===Number(id))
    if (taskIndex===-1) {
        return res.sendStatus(404)
    }
    tasks.splice(taskIndex,1)
    return res.sendStatus(204)

})

app.get('/task',(req,res)=>{
    const {des}=req.query
    if(des){
        const filterTasks=tasks.filter(i=>des.includes(des))
        return res.json(filterTasks)
    }
    return res.json(tasks)
})
app.listen(3000, (req, res) => {
    console.log('Success in port 3000!')
    
})