import * as z from 'zod'

const Methods = {
  UserSchema: {
    passwordConfirmation: (object: z.AnyZodObject) => {
      return object.refine((data: any) => data.password === data.passwordConfirmation, {
        message: 'As senhas não coincidem!',
        path: ['passwordConfirmation'],
      })
    },
  },
}

const Validations = {
  UserSchema: {
    email: z.string().nonempty('O E-Mail é obrigatório!').email('Informe um E-Mail válido!'),
    password: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres!')
      .nonempty('A senha é obrigatória!'),
    passwordConfirmation: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres!')
      .nonempty('A senha é obrigatória!'),
    name: z.string().nonempty('O nome é obrigatório!'),
    phone: z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/i, 'Informe um telefone válido!'),
    address: z.string().nonempty('O endereço é obrigatório!'),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/i, 'Informe um CPF válido!'),
    cnh: z.string().regex(/^\d{11}$/i, 'Informe uma CNH válida!'),
    LoginSchema: {
      email: z.string().nonempty('O E-Mail é obrigatório!').email('Informe um E-Mail válido!'),
      password: z.string().nonempty('A senha é obrigatória!'),
    },
    Methods: Methods.UserSchema,
  },
  TruckSchema: {
    model: z.string().nonempty('O modelo é obrigatório!'),
    plate: z.string().nonempty('A placa é obrigatória!'),
    brand: z.string().nonempty('A fabricante é obrigatória!'),
    year: z.string().nonempty('O ano é obrigatório!'),
    color: z.string().nonempty('A cor é obrigatória!'),
  },
  ModuleSchema: {
    title: z.string().nonempty('O título é obrigatório!'),
    subtitle: z.string().nonempty('O subtítulo é obrigatório!'),
    interval: z.string().nonempty('O intervalo é obrigatório!'),
  },
  SubmoduleSchema: {
    title: z.string().nonempty('O título é obrigatório!'),
    subtitle: z.string().nonempty('O subtítulo é obrigatório!'),
    description: z.string().nonempty('A descrição é obrigatória!'),
    imageField: z.enum(['true', 'false']),
  },
  SubmoduleAnswerRejectionSchema: {
    reason: z.string().nonempty('O comentário é obrigatório!'),
  },
}

export default Validations
