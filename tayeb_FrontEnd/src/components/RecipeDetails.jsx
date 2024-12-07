import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
    const { id } = useParams(); // Get the recipe ID from the URL
    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=6f5d1883e9634243ac8c5d8912f62523`)
            .then((response) => response.json())
            .then((data) => {
                setRecipe(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading recipe details: {error.message}</div>;

    return (
        <div className="container">
            <h1 className="my-4">{recipe.title}</h1>
            <img src={recipe.image} alt={recipe.title} className="img-fluid mb-4" />
            <p>{recipe.summary}</p>
            <ul>
                {recipe.extendedIngredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.original}</li>
                ))}
            </ul>
            <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                View Full Recipe
            </a>
        </div>
    );
};

export default RecipeDetails;
