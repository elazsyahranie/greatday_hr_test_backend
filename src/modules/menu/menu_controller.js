require('dotenv').config() 

module.exports = {
    addMenu: async (req, res) => { 
        const { menuName, menuType, withRice, menuDescription, menuAvailability, menuPrice, } = req.body 
        const setData = {
            menu_name: menuName, 
            menu_type: menuType, 
            mix_with_rice: withRice, 
            menu_description: menuDescription, 
            menu_availability: menuAvailability, 
            price: `Rp. ${menuPrice}` 
        }
        try {
            console.log("Add menu works!")
        } catch {
            console.log("It doesn't work")
        }
    }
}