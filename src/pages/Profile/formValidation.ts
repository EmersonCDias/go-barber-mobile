import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email('Digite um e-mail válido'),
  old_password: Yup.string(),
  // password: Yup.string().when('old_password', {
  //   is: val => !!val.length,
  //   then: Yup.string().required('Campo obrigatório'),
  //   otherwise: Yup.string(),
  // }),
  // password_confirmation: Yup.string()
  //   .when('old_password', {
  //     is: val => !!val.length,
  //     then: Yup.string().required('Campo obrigatório'),
  //     otherwise: Yup.string(),
  //   })
  //   .oneOf([Yup.ref('password')], 'As senhas são diferentes'),
});
