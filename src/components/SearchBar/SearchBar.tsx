import styles from './SearchBar.module.css'
import { Formik, Field, Form, type FormikHelpers } from 'formik';

interface FormValue{
    query: string
}

interface SearchBarOptions{
    onSubmit: (value: string) => void
}


export default function SearchBar({onSubmit}: SearchBarOptions){

    const handleSubmit = (value: FormValue, action: FormikHelpers<FormValue>) => {
       onSubmit(value.query)
       action.resetForm()
    }

    return(
    <header className={styles.header}>
        <div className={styles.container}>
            <a className={styles.link}
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer">
                Powered by TMDB
            </a>
            <Formik initialValues={{ query: "" }} 
                    onSubmit={handleSubmit} 
                    >
            <Form className={styles.form}>
                <Field className={styles.input}
                    type="text"
                    name="query"
                    autoComplete="off"
                    placeholder="Search movies..."
                    autoFocus />
                <button className={styles.button} type="submit"> Search</button>
            </Form>
            </Formik>
        </div>
        </header>)
}