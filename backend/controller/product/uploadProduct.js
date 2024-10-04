const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function UploadProductController(req, res) {
  try {
    const sessionUserId = req.userId;

    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    // Validation pour vérifier si le prix de vente est supérieur au prix
    if (req.body.sellingPrice > req.body.price) {
      return res.status(400).json({
        message: "Le prix de vente ne doit pas être supérieur au prix normal.",
        error: true,
        success: false,
      });
    }

    const uploadProduct = new productModel(req.body);
    const saveProduct = await uploadProduct.save();

    res.status(201).json({
      message: "Produit téléchargé avec succès",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = UploadProductController;