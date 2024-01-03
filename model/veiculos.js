module.exports = class veiculos { 
    constructor() {
      this.placa = "";
      this.modelo = "";
      this.marca = "";
      this.ano_fabricacao = 0;
    }

    listar(conexao, callback) {
        var sql = "select * from veiculos";
    
        conexao.query(sql, 
          function (err, result) {
            if (err) throw err;
            return  callback(result);
          }
        );
      }

      inserir(conexao) {
        var sql = "insert into veiculos (placa, modelo, marca, ano_fabricacao) values (?, ?, ?, ?)";
        conexao.query(sql, 
                      [this.placa, this.modelo, this.marca, this.ano_fabricacao],
                      function (err, result) {
                        if (err) throw err;
                      }
        );
    
      }
    
      atualizar(conexao) {
        
      }
    
      excluir(conexao) {
        
      }
    }

