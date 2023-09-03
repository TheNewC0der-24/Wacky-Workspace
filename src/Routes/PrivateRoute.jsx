import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth } from '../Context/AuthContext';

export default function PrivateRoute({ path, redirectPath, element }) {

    const { currentUser } = useAuth();

    return (
        <Routes>
            <Route
                path={path}
                element={currentUser ? element : <Navigate to={redirectPath} />}
            >

            </Route>
        </Routes>
    )
}
