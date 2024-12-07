import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch(
            'https://api.spoonacular.com/recipes/random?apiKey=6f5d1883e9634243ac8c5d8912f62523&number=20'
        )
            .then((response) => response.json())
            .then((data) => {
                setRecipes(data.recipes);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const sanitizeText = (text) => {
        const div = document.createElement('div');
        div.innerHTML = text;
        return div.textContent || div.innerText || '';
    };

    const filteredRecipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data: {error.message}</div>;

    return (
        <div className="container">
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div className="row">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map((recipe) => (
                        <div key={recipe.id} className="col-12 col-md-6 col-lg-3 mb-4">
                            <div className="card border-0 shadow-lg h-100">
                                <img
                                    src={recipe.image}
                                    className="card-img-top"
                                    alt={recipe.title}
                                />
                                <div className="card-body">
                                    <h2 className="h5">{recipe.title}</h2>
                                    <p className="flex-grow-1">
                                        {recipe.summary
                                            ? sanitizeText(recipe.summary).slice(0, 150) + '...'
                                            : 'No description available'}
                                    </p>
                                    <div className="d-flex justify-content-between mt-auto">
                                        <Link to={`/recipe/${recipe.id}`} className="btn btn-dark">
                                            Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No recipes match your search.</div>
                )}
            </div>
        </div>
    );
};

export default RecipeList;
