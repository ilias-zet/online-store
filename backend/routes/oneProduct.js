const {Router} = require('express');
const router = Router();

router.get('/one-product', (request, response) => {
    try {
        response.json({
            oneProductName: "SomeName"
        })
    } catch(e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
    }
})

module.exports = router;