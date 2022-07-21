import axios from 'axios'

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const github = axios.create({
    baseURL: GITHUB_URL,
    headers: {Authorization: `basic + ${GITHUB_TOKEN}`}
})


    //get search results
   export const searchUsers = async (text) => {
        // setLoading();

        const params = new URLSearchParams({
            q: text
        })

        const response = await github.get(`/search/users?${params}`)

        return response.data.items
    }


    //get user and repos
    export const getUserAndRepos = async (login) => {
        const [user, repos] =  await Promise.all([
            github.get(`/users/${login}`),
            github.get(`/users/${login}/repos`)
        ])


        return {user: user.data, repos: repos.data}
    }



        //Find a single user profile
       export const getUser = async (login) => {
            // setLoading();

        

            const response = await fetch(  `${GITHUB_URL}/users/${login}` , {
                headers: {
                    Authorization: `basic + ${GITHUB_TOKEN}`,
                },
            })

            if(response.status === 404) {
                window.location = '/notfound'
            } else {

                const data = await response.json()

                return data
            }

        }

        //Get User Repos
       export const getUserRepos = async (login) => {
           

            const params = new URLSearchParams({
                sort: 'created',
                per_page: 10
            })
            
            const response = await fetch(  `${GITHUB_URL}/users/${login}/repos?${params}` , {
                headers: {
                    Authorization: `basic + ${GITHUB_TOKEN}`,
                },
            })

            const data = await response.json()

            return data
        }