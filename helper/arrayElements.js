module.exports = {
    arrayElements
}


function arrayElements (arr) {
    var result =  arr.map(item => {
        return item
    })
    
    const particularElementFromArray = { ...result }
    return particularElementFromArray
}
