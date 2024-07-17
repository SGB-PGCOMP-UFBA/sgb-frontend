import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';

function LoginView(props) {
  const { formValues, onChangeFormValues, onSubmit } = props;

  return (
    <div className="flex w-full min-h-screen justify-center items-center p-4 md:p-0">
      <section className="flex flex-col items-center justify-center gap-y-8 w-full md:w-11/12 lg:w-6/12">
        <img src="/assets/pgcomp_1.png" alt="Logo" className="w-full max-w-[220px]" />
        <h1 className="max-w-[395px] text-center font-poppins text-xl font-semibold leading-7 text-gray-900">
          Sistema de Gerenciamento de Bolsas
        </h1>
        <LoginForm formValues={formValues} onChangeFormValues={onChangeFormValues} onSubmit={onSubmit} />
        <div className="flex flex-col items-center justify-center pt-4">
          <p className="text-center text-base font-normal leading-6">
            Ainda não tem uma conta?{' '}
            <a href="/cadastre-se" className="text-blue-600 transition-colors hover:text-blue-800">
              Cadastre-se!
            </a>
          </p>
          <Link to="/esqueci-a-senha" className="text-base font-normal leading-6 text-blue-600">
            Esqueceu sua senha?
          </Link>
        </div>
      </section>
    </div>
  );
}

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formValues: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  onChangeFormValues: PropTypes.func.isRequired,
};

export { LoginView };
