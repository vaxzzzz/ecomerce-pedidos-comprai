function Footer() {
    return (
        <footer className="bg-dark text-light py-4 mt-5">
            <div className="container text-center small">
                &copy; {new Date().getFullYear()} Comprai
            </div>
        </footer>
    );
}

export default Footer;
