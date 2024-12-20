import React from 'react'
import { BrowserRouter, Outlet, Route, Routes, Navigate } from 'react-router-dom'

import Dashboard from '@pages/dashboard'

import EditAdmin from '@pages/account/edit'
import AdminInfo from '@pages/account/info'

import { DriverProvider } from '@pages/drivers/'
import EditDriver from '@pages/drivers/edit'
import DriverInfo from '@pages/drivers/info'
import Drivers from '@pages/drivers/list'
import NewDriver from '@pages/drivers/new'

import { TruckProvider } from '@pages/trucks'
import EditTruck from '@pages/trucks/edit'
import TruckInfo from '@pages/trucks/info'
import Trucks from '@pages/trucks/list'
import NewTruck from '@pages/trucks/new'

import ChecklistItems from '@pages/modules/items/list'
import Modules from '@pages/modules/list'

import ModuleAnswersDistinct from '@pages/module-answers/distinct-list'
import SubmoduleAnswer from '@pages/module-answers/items/answer'
import SubmoduleAnswers from '@pages/module-answers/items/list'
import ModuleAnswers from '@pages/module-answers/list'
import ExportModule from '@pages/modules/export'

import ForgotPassword from '@pages/forgot-password'
import Login from '@pages/login'
import ResetPassword from '@pages/reset-password'
import SignUp from '@pages/sign-up'

import Private from '@components/Private'
import Logout from '@pages/logout'

import Layout from '@components/Layout'

import { AlertProvider } from '@contexts/AlertContext'
import { AuthProvider } from '@contexts/AuthContext'
import { LoadingProvider } from '@contexts/LoadingContext'
import { ModalProvider } from '@contexts/ModalContext'
import { SearchProvider } from '@contexts/SearchContext'
import { SignUpProvider } from '@contexts/SignUpContext'

const RoutesComponent: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            element={
              <AlertProvider>
                <ModalProvider>
                  <LoadingProvider>
                    <Outlet />
                  </LoadingProvider>
                </ModalProvider>
              </AlertProvider>
            }
          >
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/sign-up"
              element={
                <SignUpProvider>
                  <SignUp />
                </SignUpProvider>
              }
            />
            {/* <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} /> */}
            <Route path="/logout" element={<Logout />} />
            <Route
              element={
                <Private>
                  <SearchProvider>
                    <Layout>
                      <Outlet />
                    </Layout>
                  </SearchProvider>
                </Private>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/account">
                <Route path="/account/" element={<AdminInfo />} />
                <Route path="/account/edit" element={<EditAdmin />} />
              </Route>

              <Route path="/vehicle-modules">
                <Route
                  path="/vehicle-modules/home"
                  element={<ModuleAnswersDistinct page="vehicle-modules" />}
                />
                <Route
                  path="/vehicle-modules/"
                  element={<ModuleAnswers page="vehicle-modules" />}
                />
                <Route
                  path="/vehicle-modules/items/answer/:id"
                  element={<SubmoduleAnswer page="vehicle-modules" />}
                />
                <Route
                  path="/vehicle-modules/answer/:id"
                  element={<SubmoduleAnswers page="vehicle-modules" />}
                />
              </Route>

              <Route path="/travel-modules">
                <Route
                  path="/travel-modules/home"
                  element={<ModuleAnswersDistinct page="travel-modules" />}
                />
                <Route path="/travel-modules/" element={<ModuleAnswers page="travel-modules" />} />
                <Route
                  path="/travel-modules/items/answer/:id"
                  element={<SubmoduleAnswer page="travel-modules" />}
                />
                <Route
                  path="/travel-modules/answer/:id"
                  element={<SubmoduleAnswers page="travel-modules" />}
                />
              </Route>

              <Route path="/journey-modules">
                <Route
                  path="/journey-modules/home"
                  element={<ModuleAnswersDistinct page="journey-modules" />}
                />
                <Route
                  path="/journey-modules/"
                  element={<ModuleAnswers page="journey-modules" />}
                />
                <Route
                  path="/journey-modules/items/answer/:id"
                  element={<SubmoduleAnswer page="journey-modules" />}
                />
                <Route
                  path="/journey-modules/answer/:id"
                  element={<SubmoduleAnswers page="journey-modules" />}
                />
              </Route>

              <Route path="/drivers">
                <Route path="/drivers/" element={<Drivers />} />
                <Route path="/drivers/new" element={<NewDriver />} />
                <Route
                  element={
                    <DriverProvider>
                      <Outlet />
                    </DriverProvider>
                  }
                >
                  <Route path="/drivers/:id" element={<DriverInfo />} />
                  <Route path="/drivers/edit/:id" element={<EditDriver />} />
                </Route>
              </Route>

              <Route path="/trucks">
                <Route path="/trucks/" element={<Trucks />} />
                <Route path="/trucks/new" element={<NewTruck />} />
                <Route
                  element={
                    <TruckProvider>
                      <Outlet />
                    </TruckProvider>
                  }
                >
                  <Route path="/trucks/:id" element={<TruckInfo />} />
                  <Route path="/trucks/edit/:id" element={<EditTruck />} />
                </Route>
              </Route>

              <Route path="/modules">
                <Route path="/modules/" element={<Modules />} />
                <Route path="/modules/:id" element={<ChecklistItems />} />
                <Route path="/modules/export/:id" element={<ExportModule />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default RoutesComponent
