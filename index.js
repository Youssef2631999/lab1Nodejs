const { program } = require('commander');
const fs = require('fs');
const { title } = require('process');
const todos = fs.readFileSync('./todos.json',{ encoding: 'utf8'});
const todosArray = JSON.parse(todos);

const Writeontodosfile = array=>{
    fs.writeFileSync('./todos.json',JSON.stringify(array),{encoding: 'utf8'});
} 
program.command('add').option('-t , --title <title>','to do entry').
action((options)=>{
    const todos = fs.readFileSync('./todos.json',{ encoding: 'utf8'});
    const todosArray = JSON.parse(todos);
    var newID =todosArray[todosArray.length -1]["id"] +1;
    const todo ={
            id: newID,
            title:options["title"]
            };
            todosArray.push(todo)
            Writeontodosfile(todosArray);
});
program.command('list').
action(()=>{
    console.log(JSON.stringify(todosArray,null,2))
});
program.command('edit').argument('<id> , <id of todo>').argument('<title>', 'title of the todo').option('-t , --title <title>','to edit title ').option('-id , --id <id>','id is required').
action((id,title)=>{
    const newToDo = todosArray.map(todo=>{
                if(todo.id!=id) return todo
                    return {
                        id,title
                    }
            });
            Writeontodosfile(newToDo);
});
program.command('delete').argument('<id> , <id of todo>').
action((id)=>{
    const deletetodo = todosArray.filter(todo => todo.id!=id)
        Writeontodosfile(deletetodo);
});
program.parse(process.argv);
































// const fs = require('fs');
// const todos = fs.readFileSync('./todos.json',{ encoding: 'utf8'});
// const todosArray = JSON.parse(todos)
// const [,,command,id,title] = process.argv
// const Writeontodosfile = array=>{
//     fs.writeFileSync('./todos.json',JSON.stringify(array),{encoding: 'utf8'});
// } 

// if( command =='add'){
//     const todo ={
//         id,title,
//     };
//     todosArray.push(todo)
//     Writeontodosfile(todosArray);
// }else if (command == 'list'){
//     console.log(JSON.stringify(todosArray,null,2))
// }else if (command =='edit'){
//     const newToDo = todosArray.map(todo=>{
//         if(todo.id!=id) return todo
//             return {
//                 id,title
//             }
//     });
//     Writeontodosfile(newToDo);

// }else if (command == 'delete'){
//     const deletetodo = todosArray.filter(todo => todo.id!=id)
//     Writeontodosfile(deletetodo);
// }

















// path.join('./todos.json')
// program.command('add').version('0.1.0').argument('<id> , <id of todo>').argument('<title>', 'title of the todo')
// .action(( id,title)=>{
//     todosArray.push(todo)
// });

// // program.command('list')
// // .action(( options )=>{

// // });
