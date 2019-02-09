const storage = require("./storage")

storage.put("v", "b", (data) => {
     console.log(data)
})
storage.put("c", "b", (data) => {
     console.log(data)
})


storage.getAll((data) => {
    console.log(data);
})

storage.save((data) => {
    console.log(data)
});
