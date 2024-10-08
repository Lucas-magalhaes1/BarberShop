# Sistema de Gerenciamento de Barbearia

 O Sistema de Gerenciamento de Barbearia foi criado para otimizar a forma como barbearias
administram seus serviços e atendimentos. No cenário atual, muitas barbearias enfrentam
dificuldades na organização dos agendamentos, o que pode resultar em conflitos e insatisfação dos
clientes. A proposta deste projeto é oferecer uma plataforma digital que facilite a comunicação e o
gerenciamento eficiente entre barbeiros e clientes. Utilizando tecnologias modernas, como Node.js
e MongoDB, o sistema visa proporcionar uma experiência mais organizada e satisfatória,
melhorando a eficiência operacional e aumentando a satisfação dos usuários.


 Este projeto desenvolve um sistema completo de gerenciamento para barbearias, focado na
simplificação e eficiência dos agendamentos de serviços. Com uma interface intuitiva, a plataforma
permite que clientes e barbeiros interajam de maneira prática e direta. As principais funcionalidades
incluem:
- Cadastro de Usuários: Clientes e barbeiros podem se registrar, fornecendo informações
essenciais, facilitando o acesso e personalização do sistema.
- Agendamento de Serviços: Os clientes podem visualizar horários disponíveis e agendar serviços
com barbeiros de sua preferência, minimizando conflitos de horários e melhorando a experiência do
usuário.
- Bloqueio de Horários: Barbeiros têm a capacidade de bloquear horários indisponíveis, garantindo
uma gestão eficaz de suas agendas e evitando sobreposição de compromissos.
- Gerenciamento de Serviços: Barbeiros podem listar e editar os serviços oferecidos, incluindo
descrições detalhadas e preços, facilitando o controle e a transparência com os clientes.
- Interface Responsiva: O sistema foi projetado para ser acessível em dispositivos móveis e
desktops, garantindo uma experiência de uso consistente e agradável.

 O uso de Node.js no backend permite um processamento eficiente das solicitações, enquanto o
MongoDB oferece uma estrutura de dados flexível e escalável. Este conjunto tecnológico assegura
que o sistema possa crescer e se adaptar conforme as necessidades das barbearias evoluam. A
implementação desses recursos não apenas facilita a gestão diária dos barbeiros, mas também
melhora significativamente a satisfação dos clientes, que passam a ter maior controle sobre seus
agendamentos.


O projeto 'Sistema de Gerenciamento de Barbearia' atingiu seus objetivos principais,
proporcionando uma solução prática e eficaz para a gestão de horários e serviços em barbearias. A
plataforma desenvolvida melhorou a organização dos agendamentos, aumentando a eficiência
operacional e a satisfação dos clientes. Com uma interface amigável e funcionalidades bem
integradas, o sistema se destacou como uma ferramenta essencial para o setor, facilitando a
interação e comunicação entre clientes e barbeiros, resultando em uma operação mais fluida e
organizada.

### Documentação do Projeto

- [Diagrama de Classes](Diagrama%20de%20Classes.png)
- [História de Usuário](História%20de%20Usuário.jpg)
- [Matriz de Rastreabilidade de Requisitos](Matriz%20de%20Rastreabilidade%20de%20Requisitos.md)
- [README](README.md)
- [Regras de Negócio](Regras%20de%20Negócio.md)
- [Sistema de Gerenciamento de Barbearia](Sistema_de_Gerenciamento_de_Barbearia.pdf)
- [UML Barbearia](UML%20Barbearia.png)
- [Documentação da API](documentation.md)
- [WireFrame do Projeto](/imagens)

## Iniciando o Projeto

Certifique-se de ter o Node.js e npm (incluído com o Node.js) instalados em seu sistema antes de iniciar o projeto.


    Instalação das Dependências:

    Utilize npm ou yarn para instalar as dependências do projeto.

 

# Com npm
npm install

# Ou com yarn
   yarn 

    Certifique-se de que seu projeto React está configurado para iniciar corretamente com npm run dev ou yarn dev. Verifique o arquivo package.json na seção scripts para garantir que o comando dev esteja configurado para iniciar o servidor de desenvolvimento.

Backend (Node.js com Express)

    Instalação das Dependências:

    Navegue até a pasta do seu projeto backend (onde server.js está localizado) e instale as dependências.



# Com npm
npm install

# Ou com yarn
yarn 

Inicialização do Servidor:

Inicie o servidor Node.js usando o seguinte comando:



    node server.js

    Certifique-se de que seu arquivo server.js está configurado corretamente para iniciar o servidor Express. Isso inclui a configuração de portas, conexões com bancos de dados (se necessário) e outras configurações específicas do seu aplicativo.

Observações Adicionais

    Portas e Configurações: Verifique se não há conflitos de portas entre o frontend e o backend. O frontend geralmente roda na porta 3000 por padrão, enquanto o backend pode usar a porta 5000 ou outra porta de sua escolha.

    Scripts Personalizados: Personalize os scripts no package.json conforme necessário para atender às suas necessidades específicas de desenvolvimento, como scripts para build, testes e ambiente de produção.

    Gerenciadores de Pacotes: Escolha entre npm e yarn com base na sua preferência, mas mantenha a consistência para evitar problemas de compatibilidade e gerenciamento de dependências.

