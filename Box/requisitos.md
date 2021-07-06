# Glossário

Bandeja: Lista de itens editáveis pelo cliente antes de submeter o pedido
Conta: Conjunto de bandejas referentes ao mesmo cliente em uma sessão

# Requisitos Funcionais 

Deve ser possível um cliente se registar
Deve ser possível um cliente fazer login
Deve ser possível um cliente adicionar um método de pagamento
Deve ser possível um cliente aceder ao cardápio e selecionar as opções que pretende indicando as quantidades
Deve ser possível um cliente adicionar à bandeja multiplos produtos de diferentes famílias
Deve ser possível um cliente personalizar o pedido indicando ingredientes a remover
Deve ser possível um cliente personalizar o pedido indicando ingredientes a adicionar
Deve ser possível um cliente finalizar um pedido sem fechar a conta
Deve ser possível um cliente remover produtos antes de finalizar um pedido
Deve ser possível um cliente fechar a conta
Deve ser possível um cliente chamar um funcionário em caso de necessidade

Deve ser possível o restaurante aceitar um pedido do cliente
Deve ser possível o restaurante finalizar um pedido
Deve ser possível o restaurante fechar a conta
Deve ser possível o restaurante cancelar um pedido
Deve ser possível o restaurante adicionar um produto ao pedido em espera
Deve ser possível o restaurante remover um produto ao pedido em espera
Deve ser possível o restaurante alterar um produto ao pedido em espera
Deve ser possível o restaurante desativar um produto por conta do estoque

Opcional: Deve ser possível o restaurante adicionar um produto na base de dados
Opcional: Deve ser possível o restaurante remover um produto na base de dados
Opcional: Deve ser possível o restaurante alterar um produto na base de dados
Opcional: Deve ser possível o restaurante verificar os movimentos de valores

Opcional: Deve ser possível um cliente dar o feedback referente aos produtos
Opcional: Deve ser possível um cliente receber uma estimativa de tempo de entrega
Opcional: Deve ser possível um cliente receber sugestões de combinações de pratos

# Requisitos Não Funcionais - restrições ou qualidades 

A aplicação deve ser optimizada para dispositivos móveis (frontend cliente)
A aplicação deve ser optimizada para desktop (backend)
A aplicação deve enviar um alerta caso os SLA não sejam respeitados

# Requisitos de Domínio - restrições relacionadas ao negócio 

Deve ser obrigatório o registo para finalizar um pedido
Deve ser obrigatório adicionar uma forma de pagamento para finalizar um pedido
Quando um pedido é finalizado e enviado, não é possível cancelar ou modificar o mesmo
