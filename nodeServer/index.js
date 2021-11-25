// Node Server which will handle socket io connections

//using socket.io on 8000 port
//const io=require('socket.io')(8000)
const io=require('socket.io')(8000,{
    cors:{
        origin:'*',
    }
});

const users={};
//to listen incoming events io.on means it will listen to mutilple listens,like user1 joined,user2 joined ..
//and so on while socket.on listen to what should happen with a particular event
io.on('connection',socket=>{
    socket.on('new-user-joined',name =>{
        console.log("New user",name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);//will tell others that some new user has joined
    })

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name: users[socket.id]})
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
    });
})