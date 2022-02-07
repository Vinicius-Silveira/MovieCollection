import React from 'react'
import logo from '../../assets/cinematicket.png'
import { api } from '../../services/Api'
import { Form, Repos } from './styles'
import { Link } from 'react-router-dom'

interface MovieRepository {
  Title: string;
  Plot: string;
  Year: string;
  Awards: string;
  Genre: string;
  Actors: string;
  BoxOffice: string;
  Poster: string;
}

export const Dashboard: React.FC = () => {

  const [newRepo, setNewRepo] = React.useState<String>('')
  const [repos, setRepos] = React.useState<MovieRepository[]>([])

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setNewRepo(event.target.value)
  }

  async function handleAddRepo(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault() // evita atualizar a pagina inteira
    if (!newRepo) {
      alert('Nome do filme não foi informado')
      return
    }
    // tenta procurar
    try {
      // consome API
      const response = await api.get<MovieRepository>(`?t=${newRepo}&apikey="your-api-key"`)
      // recebe resultado
      const repository = response.data
      // atualiza vetor
      setRepos([...repos, repository])

    } catch {
      alert('Repositório não existe')
    }
  }

  return (
    <>
      <img src={logo} alt="Movie Collection" />
      <title> Catálogo de repositorios do GitHub </title>
      <Form onSubmit={handleAddRepo}>
        <input onChange={handleInputChange} placeholder="Ex: Batman" />
        <button type="submit"> Buscar Filme </button>
      </Form>
      <Repos>
        {
          repos.map((repository, index) => (
            <Link to={`/repositories/${repository.Title}`}
              key={repository.Title + index}>
              <img src={repository.Poster} alt={repository.Poster} />
              <div>
                <strong> {repository.Title + " " + "(" + repository.Year + ")"} </strong>
                <p>{repository.Plot}</p>
                <p>{"Actors: " + repository.Actors}</p>
                <p> {"Genre: " + repository.Genre}</p>
                <p>{"Awards: " + repository.Awards}</p>
                <p>{"Arrecadado em bilheteria: " + repository.BoxOffice}</p>
              </div>
            </Link>
          )).reverse()
        }
      </Repos>
    </>
  )
}