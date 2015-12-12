
# English

## Folders
 * `main` :  Some files do not make any sense to be inside a `feature folder`. Cause it makes sense to whole project, for instance:
    + Config scripts
    + General stylesheets

The main folder has to be the core of the project, everything that make sense to whole project has to be here, in other words, everything that is not only a feature of the project and isn't a component. This way, these other things can connect to it.

* `features` :  Entities or features of the project will be at this folder, example:
    + login
    + Sign Up
    + Profile
    + Movies (in a rental project)

* `components` : Web components that you can reuse in other projects.

===

# Português - BR

## Pastas
 * `main` :  Não faz o menor sentido em alguns arquivos ficarem dentro de uma `pasta característica (feature)` do projeto. Pois os mesmos fazem sentido para o projeto como um todo, por exemplo:
    + Scripts de configuração
    + Arquivos gerais de estilo
    
A pasta principal tem que ser o núcleo do projeto, tudo o que faz sentido para todo projeto tem que estar aqui, em outras palavras, tudo o que não é apenas uma característica do projeto e não é um componente. Desta forma, essas outras coisas que podem se conectar a ele.

 * `features` : Pasta destinada as características do projeto, ou seja, tudo que em um mapeamento seriam as `entidades` também seriam incluídas nesta pasta, por exemplo:
  + Login
  + Cadastro
  + Perfil
  + Filmes (Em um projeto de locadora)
  
 * `components` : Componentes web reutilizáveis em outros projetos.
