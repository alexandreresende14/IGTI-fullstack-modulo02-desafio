# IGTI-fullstack-modulo02-desafio
Desafio modulo 02 curso Fullstack IGTI - Criação de API

OBS: Necessário instalar os pacotes express, cors, winston e swagger-ui-express.
A API pode ser testada em "localhost:3000/doc".

Abaixo a descrição do desafio que tive que implementar

1. Crie um endpoint para criar uma grade. Este endpoint deverá receber como parâmetros 
os campos student, subject, type e value conforme descritos acima. Esta grade deverá ser 
salva no arquivo json grades.json, e deverá ter um id único associado. No campo 
timestamp deverá ser salvo a data e hora do momento da inserção. O endpoint deverá 
retornar o objeto da grade que foi criada. A API deverá garantir o incremento automático 
deste identificador, de forma que ele não se repita entre os registros. Dentro do arquivo 
grades.json que foi fornecido para utilização no desafio o campo nextId já está com um 
valor definido. Após a inserção é preciso que esse nextId seja incrementado e salvo no 
próprio arquivo, de forma que na próxima inserção ele possa ser utilizado.

2. Crie um endpoint para atualizar uma grade. Este endpoint deverá receber como 
parâmetros o id da grade a ser alterada e os campos student, subject, type e value. O 
endpoint deverá validar se a grade informada existe, caso não exista deverá retornar um 
erro. Caso exista, o endpoint deverá atualizar as informações recebidas por parâmetros 
no registro, e realizar sua atualização com os novos dados alterados no arquivo 
grades.json.
3. Crie um endpoint para excluir uma grade. Este endpoint deverá receber como 
parâmetro o id da grade e realizar sua exclusão do arquivo grades.json.

4. Crie um endpoint para consultar uma grade em específico. Este endpoint deverá 
receber como parâmetro o id da grade e retornar suas informações.

5. Crie um endpoint para consultar a nota total de um aluno em uma disciplina. O 
endpoint deverá receber como parâmetro o student e o subject, e realizar a soma de 
todas os as notas de atividades correspondentes a aquele subject para aquele student. O 
endpoint deverá retornar a soma da propriedade value dos registros encontrados.

6. Crie um endpoint para consultar a média das grades de determinado subject e type. O 
endpoint deverá receber como parâmetro um subject e um type, e retornar a média. A 
média é calculada somando o registro value de todos os registros que possuem o subject
e type informados, e dividindo pelo total de registros que possuem este mesmo subject e 
type.
