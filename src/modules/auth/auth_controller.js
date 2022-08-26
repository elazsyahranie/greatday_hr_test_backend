require('dotenv').config()

module.exports = {
    register: async (req, res) => {
        try {
            const { fullName, userName, userGender } = req.body 
            const setData = {
                name: fullName, 
                username: userName, 
                gender: userGender,
            }
            console.log(req)
            console.log(setData)
        } catch (error) {
            console.log(error)
        } 
    }
}