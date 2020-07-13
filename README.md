Mudar o link da URL de conexão do mongoDB no arquivo `app.ts` ou rodar o comando `docker run --name v12 -p 27017:27017 -d -t mongo`, com docker instalado

```bash
# Clone this repository
$ git clone https://github.com/GMarroquio/v12Teste.git

# Go into the repository
$ cd v12Teste

# Install dependencies
$ yarn install

# Run expo
$ yarn dev
```

No arquivo `Insomnia.json` estão as requisições para teste

Endponts:
POST `/drivers` – Cadastro de motoristas.

```
name: string
lastName: string
cpf: string
birthday: string -> (dd/mm/aaaa)
active: boolean
```

Active é opcional, quando omitido inicia `true`.
Array de veiculos inicia vazio.
\_id, data de cadastro e data de atualização feitos automaticamente pelo MongDB.

UPDATE `/driver/:cpf` - Update do motorista:
Todos os campos são opcionais.

```
newName: string
newLastName: string
newCpf: string
newBirthday: string -> (dd/mm/aaaa)
newStatus: boolean
```

O campo de atualização muda automaticamente.

GET `/drivers` - lista todos os motoristas:
Lista todos os motoristas.

GET `/drivers/:cpf` - lista um motoristas:
Lista motorista com esse cpf.

DELETE `/driver/:cpf` - deleta motorista:
Remove motorista com esse cpf.

POST `/addvehicle` -
Adicionar id do veículo ao motorista.

POST `/vehicles` – Cadastro de veículo.

```
ownerCpf: string
licensePlate: string
renavam: string
```

\_id é automaticamente criado.

UPDATE `/vehicle/:placa` -
Todos os campos são opcionais.

```
newOwnerCpf: string
newPlate: string
newRenavam: string
```

GET `/vehicles` :
Lista todos os veiculos.

GET `/vehicle/:placa` :
Lista veiculo com a placa.

DELETE `/vehicle/:placa` :
Remove veículo com a placa.

Como o cpf e a placa do carro são unicos, foram utilizados para buscar no banco de dados as informações necessarias para atualização, deleção e criação
