import { ForgetPasswordForm } from './ForgetPasswordForm'

function PageForgetPassword() {
  return (
    <div className="flex h-screen w-full items-center justify-center p-6 md:p-0">
      <section className="flex w-full flex-col items-center justify-center gap-y-7 md:w-11/12 lg:w-full">
      <img src="/assets/pgcomp_1.png" alt="Logo" className="w-full max-w-[220px]" />
        <h1 className="max-w-[390px] text-center font-poppins text-lg font-semibold leading-7 text-gray-900 md:w-11/12 lg:w-6/12 lg:text-xl">
          Sistema de Gerenciamento de Bolsas
        </h1>
        <p className="mt-4 max-w-[390px] text-center font-inter text-sm leading-6 text-gray-800 md:text-base">
          Informe o endereço de e-mail utilizado em seu cadastro.
        </p>
        <ForgetPasswordForm />
      </section>
    </div>
  )
}

export { PageForgetPassword }
