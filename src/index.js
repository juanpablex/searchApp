import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
//import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import CrearEmpresaScreen from './screens/CrearEmpresaScreen';
import CrearUsuarioScreen from './screens/CrearUsuarioScreen';
import CrearGrupoScreen from './screens/CrearGrupoScreen';
import CrearLugarScreen from './screens/CrearLugarScreen';
import CrearPersonaScreen from './screens/CrearPersonaScreen';
import CrearEmpleadoScreen from './screens/CrearEmpleadoScreen';
import CrearProductoScreen from './screens/CrearProductoScreen';
import LoginScreen from './screens/LoginScreen';
import ListaLugaresScreen from './screens/ListaLugaresScreen';
import ListaProductosScreen from './screens/ListaProductosScreen';
import DetalleLugarScreen from './screens/DetalleLugarScreen';
import DetalleProductoScreen from './screens/DetalleProductoScreen';
import DetalleProductoLugarScreen from './screens/DetalleProductoLugarScreen';
import CrearFotoScreen from './screens/CrearFotoScreen';
import CrearCompraScreen from './screens/CrearCompraScreen';
import CrearVentaScreen from './screens/CrearVentaScreen';
import MisProductosScreen from './screens/MisProductosScreen';
import MisTiposProductosScreen from './screens/MisTiposProductosScreen';
import MisEmpleadosScreen from './screens/MisEmpleadosScreen';
import MisLugaresScreen from './screens/MisLugaresScreen';
import MisGruposScreen from './screens/MisGruposScreen';
import SalirScreen from './screens/SalirScreen';
import EscogerEmpresaScreen from './screens/EscogerEmpresaScreen';
import EditarDatosScreen from './screens/EditarDatosScreen';
import EditarEmpresaScreen from './screens/EditarEmpresaScreen';
import MisProductosLugarScreen from './screens/MisProductosLugarScreen';
//import CrearTipoProductoScreen from './screen/CrearTipoProductoScreen';
import ListaProductosLugarScreen from './screens/ListaProductosLugarScreen';
import { setNavigator, getTabvisible, switchtabvisible } from './navigationRef';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CrearTipoProductoScreen from './screens/CrearTipoProductoScreen';
import MisEmpresasScreen from './screens/MisEmpresasScreen';
//reportes
//import CrearPdfReporte from './screens/CrearPdfReporte.tsx';

const listaLugaresFlow = createStackNavigator({
    listaLugares: {
        screen: ListaLugaresScreen,
        navigationOptions: {
            headerTitleAlign: 'center',
            title: 'Lugares',
            //tabBarIcon: <MaterialIcons name='search' size={20} />
        }
    },

    detalleLugar: {
        screen: DetalleLugarScreen,


    },
    listaProductoLugar: {
        screen: ListaProductosLugarScreen,
        // navigationOptions: {
        //     headerTitleAlign: 'center',
        //     title: 'Detalle del lugar'
        // }

    },
    detalleProductoLugar: {
        screen: DetalleProductoLugarScreen,
        // navigationOptions: {
        //     headerTitleAlign: 'center',
        //     title: 'Detalle'
        // }

    }
});




const listaProductosFlow = createStackNavigator({
    listaProductos: {
        screen: ListaProductosScreen,
        navigationOptions: {
            headerTitleAlign: 'center',
            title: 'Productos'
        }

    },
    // detalleProducto: {
    //     screen: DetalleProductoScreen,
    //     // navigationOptions: {
    //     //     headerTitleAlign: 'center',
    //     //     title: 'Detalle'
    //     // }

    // },
    detalleProductoLugar: {
        screen: DetalleProductoLugarScreen,
        // navigationOptions: {
        //     headerTitleAlign: 'center',
        //     title: 'Detalle'
        // }

    }
});

listaLugaresFlow.navigationOptions = {
    title: 'lugares',
    tabBarVisible: getTabvisible(),
    tabBarIcon: <MaterialIcons name='place' size={15} />
}

listaProductosFlow.navigationOptions = {
    title: 'productos',
    tabBarIcon: <MaterialIcons name='cake' size={15} />
}

const buscarFlow = createBottomTabNavigator({
    listaLugaresFlow,
    listaProductosFlow

});
console.log('estoy escondiendo');
buscarFlow.navigationOptions = {
    title: 'buscar',
    //tabBarVisible: getTabvisible(),
    tabBarIcon: <MaterialIcons name='search' size={15} />,
    barStyle: {
        backgroundColor: '#006400',
        width: 'auto'
    }
};

const lugarFlow = createStackNavigator({

    misLugares: {
        screen: MisLugaresScreen,
        navigationOptions: {
            headerTitleAlign: 'center',
            title: 'Mis Lugares'
        }
    },
    crearLugar: {
        screen: CrearLugarScreen,
        //navigationOptions: {
        //   headerTitleAlign: 'center',
        //title: 'Crear Lugar'
        // }
    },
    // crearFoto: {
    //     screen: CrearFotoScreen,
    //     navigationOptions: {
    //         headerTitleAlign: 'center',
    //         title: 'Crear Foto'
    //     }
    // },
    detalleProductoLugar: {
        screen: DetalleProductoLugarScreen,
    },
    misProductosLugar: {
        screen: MisProductosLugarScreen,
    },
    crearFoto: {
        screen: CrearFotoScreen,
        navigationOptions: {
            headerTitleAlign: 'center',
            title: 'Crear Foto'
        }
    }
});


const empleadoFlow = createStackNavigator({
    misEmpleados: {
        screen: MisEmpleadosScreen,
        // navigationOptions: {
        //     headerTitleAlign: 'center',
        //     title: 'Mis Empleados'
        // }
    },
    crearEmpleado: {
        screen: CrearEmpleadoScreen,
        // navigationOptions: {
        //     headerTitleAlign: 'center',
        //     title: 'Crear Empleado'
        // }
    },
    crearFoto: {
        screen: CrearFotoScreen,
        navigationOptions: {
            headerTitleAlign: 'center',
            title: 'Crear Foto'
        }
    }
});

const productoFlow = createStackNavigator({
    misProductos: {
        screen: MisProductosScreen,
        // navigationOptions: {
        //     headerTitleAlign: 'center',
        //     title: 'Mis Productos'
        // }
    },
    misTiposProductos: {
        screen: MisTiposProductosScreen
    },
    crearTipoProducto: {
        screen: CrearTipoProductoScreen,
        navigationOptions: {
            headerTitleAlign: 'center',
            title: 'Crear Tipo de Productos'
        }
    },
    crearProducto: {
        screen: CrearProductoScreen,
        // navigationOptions: {
        //     headerTitleAlign: 'center',
        //     title: 'Crear Producto'
        // }
    },
    crearFoto: {
        screen: CrearFotoScreen,
        navigationOptions: {
            headerTitleAlign: 'center',
            title: 'Crear Foto'
        }
    }
});

const grupoFlow = createStackNavigator({
    misGrupos: {
        screen: MisGruposScreen,
        navigationOptions: {
            headerTitleAlign: 'center',
            title: 'Mis Grupos'
        }
    },
    crearGrupo: {
        screen: CrearGrupoScreen,
    },
    crearFoto: {
        screen: CrearFotoScreen,
        navigationOptions: {
            headerTitleAlign: 'center',
            title: 'Crear Foto'
        }
    }
});

lugarFlow.navigationOptions = {
    title: 'lugar',
    tabBarIcon: <MaterialIcons name='place' size={15} />
};

empleadoFlow.navigationOptions = {
    title: 'empleado',
    tabBarIcon: <MaterialCommunityIcons name='worker' size={15} />
};

productoFlow.navigationOptions = {
    title: 'producto',
    tabBarIcon: <MaterialIcons name='cake' size={15} />
};

grupoFlow.navigationOptions = {
    title: 'grupo',
    tabBarIcon: <MaterialIcons name='group' size={15} />
}

const crearFlow = createBottomTabNavigator({
    lugarFlow,
    productoFlow,
    empleadoFlow,
    grupoFlow
});

crearFlow.navigationOptions = {
    title: 'crear',
    tabBarIcon: <MaterialIcons name='edit' size={15} />
};

const ventaFlow = createStackNavigator({
    crearVenta: {
        screen: CrearVentaScreen,
        // navigationOptions: {
        //     headerTitleAlign: 'center',
        //     title: 'Ventas'
        // }
    },
});

const compraFlow = createStackNavigator({
    crearCompra: {
        screen: CrearCompraScreen,
        navigationOptions: {
            headerTitleAlign: 'center',
            title: 'compras'
        }
    },
});

const shopFlow = createBottomTabNavigator({
    ventaFlow,
    compraFlow
});

ventaFlow.navigationOptions = {
    headerTitleAlign: 'center',
    title: 'ventas',
    tabBarIcon: <MaterialIcons name='monetization-on' size={15} />
};

compraFlow.navigationOptions = {
    headerTitleAlign: 'center',
    title: 'Compras',
    tabBarIcon: <MaterialIcons name='shopping-cart' size={15} />
}

shopFlow.navigationOptions = {
    title: 'transacciones',
    tabBarIcon: <MaterialIcons name='trending-up' size={15} />
};

const salirFlow = createStackNavigator({
    salir: {
        screen: SalirScreen,
        navigationOptions: {
            headerTitleAlign: 'center',
            title: 'Salir'
        }
    },
    crearFoto: {
        screen: CrearFotoScreen,
        navigationOptions: {
            headerTitleAlign: 'center',
            title: 'Crear Foto'
        }
    }

});

const datosFlow = createStackNavigator({
    editarDatos: {
        screen: EditarDatosScreen,
        navigationOptions: {
            headerTitleAlign: 'center',
            title: 'Mis Datos'
        }
    },
    crearFoto: {
        screen: CrearFotoScreen,
        navigationOptions: {
            headerTitleAlign: 'center',
            title: 'Crear Foto'
        }
    }
});

const empresaFlow = createStackNavigator({
    misEmpresas: {
        screen: MisEmpresasScreen,

    },
    editarEmpresa: {
        screen: EditarEmpresaScreen,
        // navigationOptions: {
        //     headerTitleAlign: 'center',
        //     title: 'Mis Empresas'
        // }
    },
    crearFoto: {
        screen: CrearFotoScreen,
        navigationOptions: {
            headerTitleAlign: 'center',
            title: 'Crear Foto'
        }
    }
});

// const reportesFlow = createStackNavigator({
//     miReporte: {
//         screen: CrearPdfReporte
//     }
// });

const ajustesFlow = createBottomTabNavigator({
    salirFlow,
    datosFlow,
    empresaFlow,
    //reportesFlow
});

salirFlow.navigationOptions = {
    title: 'salir',
    tabBarIcon: <Ionicons name='md-log-out' size={15} />
};

datosFlow.navigationOptions = {
    title: 'mis datos',
    tabBarIcon: <MaterialIcons name='person' size={15} />
};

empresaFlow.navigationOptions = {
    title: 'mis empresas',
    tabBarIcon: <MaterialIcons name='business' size={15} />
};

ajustesFlow.navigationOptions = {
    title: 'ajustes',
    tabBarIcon: <MaterialIcons name='settings' size={15} />
};

// reportesFlow.navigationOptions = {
//     title: 'reportes',
//     tabBarIcon: <MaterialIcons name='receipt' size={20} />
// };



// const empresaFlow = createSwitchNavigator({
//     crearPersona: CrearPersonaScreen,
//     crearEmpresa: CrearEmpresaScreen,
//     crearUsuario: CrearUsuarioScreen
// });

const mainFlow = createBottomTabNavigator({
    //listaLugaresFlow,
    buscarFlow,

    crearFlow,
    shopFlow,
    ajustesFlow
});







const switchNavigator = createSwitchNavigator({

    loginFlow: createStackNavigator({
        login: {
            screen: LoginScreen,
            navigationOptions: {
                headerTitleAlign: 'center',
                title: 'Login'
            },

        },
        escogerEmpresa: {
            screen: EscogerEmpresaScreen,
            navigationOptions: {
                headerTitleAlign: 'center',
                title: 'Escoge tu empresa'
            }
        },
        // crearPersona: CrearPersonaScreen,
        // crearEmpresa: CrearEmpresaScreen,
        // crearUsuario: CrearUsuarioScreen
        crearPersona: {
            screen: CrearPersonaScreen,
            navigationOptions: {
                headerTitleAlign: 'center',
                title: 'Crear Persona',
                headerLeft: () => { null }
            }
        },
        crearEmpresa: {
            screen: CrearEmpresaScreen,
            navigationOptions: {
                headerTitleAlign: 'center',
                title: 'Crear Empresa',
                headerLeft: () => { null }
            }
        },
        crearUsuario: {
            screen: CrearUsuarioScreen,
            navigationOptions: {
                headerTitleAlign: 'center',
                title: 'Crear Usuario',
                headerLeft: () => { null }
            }
        }

    }),


    mainFlow

    // mainFlow: createDrawerNavigator({
    //     //listaLugaresFlow,
    //     buscarFlow,

    //     crearFlow,
    //     shopFlow,
    //     ajustesFlow
    // }),

});




const Ely = createAppContainer(switchNavigator);
//const Ely = createAppContainer(mainFlow);

export default () => {
    return (
        <Ely ref={(navigator) => {
            setNavigator(navigator)
        }}

        />
    );
};
//export default createAppContainer(mainFlow);