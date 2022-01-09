import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
        isLoading: false,
        selectedSort: "",
        searchedQuery: "",
        pageNumber: 1,
        limitPosts: 10,
        totalPages: 0,
        selectorOptions: [
          {
            value: "id",
            name: "По ID",
          },
          {
            value: "title",
            name: "По названию",
          },
          {
            value: "body",
            name: "По содержимому",
          },
        ],
    }),
    getters: {
        sortedPosts(state) {
            if (state.selectedSort == "id") {
              return [...state.posts].sort((post1, post2) => {
                return post1[state.selectedSort] - post2[state.selectedSort];
              });
            } else {
              return [...state.posts].sort((post1, post2) => {
                return post1[state.selectedSort]?.localeCompare(
                  post2[state.selectedSort]
                );
              });
            }
          },
          sortAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter((post) => {
              return post.title
                .toLowerCase()
                .includes(state.searchedQuery.toLowerCase());
            });
          },
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts; 
        },
        setLoading(state, bool) {
            state.isLoading = bool; 
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort; 
            actions.fetchPosts(); 
        },
        setSearchedQuery(state, str) {
            state.searchedQuery = str; 
        }, 
        setPageNumber(state, page) {
            state.pageNumber = page; 
        }, 
        setTotalPages(state, pages) {
            state.totalPages = pages; 
        }, 
    },
    actions: {
        async fetchPosts({ state, commit }) {
            try {
              commit('setLoading', true);
              const response = await axios.get(
                "https://jsonplaceholder.typicode.com/posts?",
                {
                  params: {
                    _page: state.pageNumber,
                    _limit: state.limitPosts,
                  },
                }
              );
              commit('setTotalPages', Math.ceil(
                response.headers["x-total-count"] / state.limitPosts
              ));
              commit('setPosts', response.data);
            } catch (error) {
              alert(error);
            } finally {
                commit('setLoading', false)
            }
          },
    },
    namespaced: true
}