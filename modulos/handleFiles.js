const fs = require('fs');

class Contenedor {
  constructor(myFile) {
    this.myFile = myFile;
    this.id = 1;
    this.listProductsOnFile = [];
  }

  async save(myObject) {
    try {
      let content;

      if (fs.existsSync(this.myFile)) {
        content = await fs.promises.readFile(this.myFile, 'utf-8');
      } else {
        content = await fs.promises.writeFile(this.myFile, '');
      }

      if (content && content.length > 0) {
        

        this.listProductsOnFile = await JSON.parse(content);
        this.id = this.listProductsOnFile[this.listProductsOnFile.length - 1].id + 1;
        this.listProductsOnFile.push({ id: this.id, timestamp: Date.now(), ...myObject });
      } else {
        
        this.listProductsOnFile.push({ id: this.id, timestamp: Date.now(), ...myObject });
      }
      await fs.promises.writeFile(this.myFile, `${JSON.stringify(this.listProductsOnFile)}`);
      return this.id;
    } catch (err) {
      console.log('Error de escritura: ', err);
    }
  }

  async getById(id) {
    try {
      if (fs.existsSync(this.myFile)) {
        const content = await fs.promises.readFile(this.myFile, 'utf-8');

        const producToFind = content && (await JSON.parse(content).find((element) => element.id === id));
        return !producToFind || producToFind.length === 0 ? null : producToFind;
      } else {
        console.log('Archivo no existe');
        return null;
      }
    } catch (err) {
      console.log('Error de lectura: ', err);
    }
  }

  async getAll() {
    try {
      if (fs.existsSync(this.myFile)) {
        const content = await fs.promises.readFile(this.myFile, 'utf-8');
        const listProducts = content && (await JSON.parse(content));
        return listProducts;
      } else {
        console.log('Archivo no existe');
        return null;
      }
    } catch (err) {
      console.log('Error de lectura: ', err);
    }
  }

  async updateById(id, updatedProduct) {
    try {
      if (fs.existsSync(this.myFile)) {
        const content = await fs.promises.readFile(this.myFile, 'utf-8');
        let newListProducts = content && (await JSON.parse(content));
        const indexProducToUpdate = newListProducts && newListProducts.findIndex((element) => element.id === id);
        if (indexProducToUpdate !== -1) {
          newListProducts[indexProducToUpdate] = { ...updatedProduct, id: id, timestamp: newListProducts[indexProducToUpdate].timestamp };
          await fs.promises.writeFile(this.myFile, `${JSON.stringify(newListProducts)}`);
        }
        return newListProducts;
      } else {
        console.log('Archivo no existe');
        return null;
      }
    } catch (err) {
      console.log('Error de lectura: ', err);
    }
  }

  async deleteById(id) {
    try {
      if (fs.existsSync(this.myFile)) {
        const content = await fs.promises.readFile(this.myFile, 'utf-8');
        const newProducts = content && (await JSON.parse(content).filter((element) => element.id !== id));
        await fs.promises.writeFile(this.myFile, `${JSON.stringify(newProducts)}`);
        return newProducts;
      } else {
        console.log('Archivo no existe');
      }
    } catch (err) {
      console.log('Error de lectura: ', err);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.myFile, '');
    } catch (err) {
      console.log('Error de lectura: ', err);
    }
  }
}

module.exports = { Contenedor };