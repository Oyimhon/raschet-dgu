import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Stack,
  Container,
} from '@mui/material';
import { useState } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import teal from '@mui/material/colors/teal';

const theme = createTheme({
  palette: {
    primary: teal,
  },
});

function App() {
  const [result, setResult] = useState(0);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      alpha: 45,
      L: 10,
      R0: 100,
      Rsh: 50,
      N: 1000,
      H: 1,
      J: 10,
      T: 300,
      r: 1,
      mu: 0.5,
      c: 299792458,
      q: Math.exp(1.602e-19),
      k: Math.exp(1.38e-23),
    },
  });
  const onSubmit = (data) => {
    const { alpha, N, q, R0, Rsh, k, T, H, J, L, mu, r, c } = data;
    // Преобразование угла освещенности из градусов в радианы
    var alphaRad = (alpha * Math.PI) / 180;

    // Расчет значений выражений
    var temp1 = (N * q * (R0 + Rsh)) / (2 * k * T); // значение подвыражения в скобках (2.2)
    var temp2 = (H * J * alphaRad * L * mu) / (r * c); // значение подвыражения в скобках (2.3)
    var expValue = Math.exp(temp1) - 1; // значение выражения (Math.exp(temp1) - 1)
    var resultLoc = temp2 / expValue; // итоговый результат

    // Вывод результата
    setResult(resultLoc);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        className="App"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: 'lightcyan',
        }}
      >
        <Container
          style={{
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <Typography
            component={'h1'}
            fontSize={'40px'}
            lineHeight={'45px'}
            mb="25px"
          >
            Рассчет преобразования оптического сигнала в электрический
          </Typography>

          <Stack
            spacing={'15px'}
            component={'form'}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid
              container
              spacing={'15px'}
              display={'flex'}
              justifyContent={'center'}
            >
              <Grid item xs={4}>
                <Controller
                  name="alpha"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="number"
                      id="alpha"
                      label="Угол освещенности в градусах"
                      onChange={{}}
                      style={{ width: '100%' }}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Controller
                  name="L"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="number"
                      id="L"
                      label="Длина диффузии"
                      onChange={{}}
                      style={{ width: '100%' }}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Controller
                  name="R0"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="number"
                      id="R0"
                      label="Сопротивление электронно-дырочных переходов"
                      onChange={{}}
                      style={{ width: '100%' }}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Controller
                  name="Rsh"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="number"
                      id="Rsh"
                      label="Сопротивление фото-шунта"
                      onChange={{}}
                      style={{ width: '100%' }}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Controller
                  name="N"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="number"
                      id="N"
                      label="Концентрация основных носителей заряда"
                      onChange={{}}
                      style={{ width: '100%' }}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Controller
                  name="H"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="number"
                      id="H"
                      label="Напряженность магнитного поля"
                      onChange={{}}
                      style={{ width: '100%' }}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Controller
                  name="J"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="number"
                      id="J"
                      label="Интенсивность света"
                      onChange={{}}
                      style={{ width: '100%' }}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Controller
                  name="T"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="number"
                      id="T"
                      label="Температура"
                      onChange={{}}
                      style={{ width: '100%' }}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Controller
                  name="r"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="number"
                      id="r"
                      label="Время жизни носителя заряда"
                      onChange={{}}
                      style={{ width: '100%' }}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Controller
                  name="mu"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="number"
                      id="mu"
                      label="Подвижность зарядов"
                      onChange={{}}
                      style={{ width: '100%' }}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Controller
                  name="q"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="number"
                      disabled
                      id="q"
                      label="Значение единичного заряда в Кл (константа)"
                      style={{ width: '100%' }}
                      onChange={{}}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Controller
                  name="k"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="number"
                      disabled
                      id="k"
                      label="Постоянная Больцмана в Дж/К (константа)"
                      style={{ width: '100%' }}
                      onChange={{}}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Controller
                  name="c"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="number"
                      disabled
                      id="c"
                      label="Скорость света в м/с (константа)"
                      style={{ width: '100%' }}
                      onChange={{}}
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Рассчитать
            </Button>
            {result > 0 && <Typography>{result}</Typography>}
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
