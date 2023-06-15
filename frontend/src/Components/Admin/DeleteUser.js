import React from 'react';


const DeleteUser = ({ user }) => {
  const handleDelete = async () => {
    try {
      const storedData = localStorage.getItem('tokens');
      const parsedData = JSON.parse(storedData);
      const requestOptions = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${parsedData.access}`,
        },
      };

      const response = await fetch(
        `http://localhost:8000/api/users/${user.id}/`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <button
        className="btn btn-primary btn-block"
        onClick={handleDelete}
        style={{ marginTop: '20px' }}
      >
        usuń
      </button>
    </div>
  );
};

export default DeleteUser;
