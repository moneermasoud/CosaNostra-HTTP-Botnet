Imports System.Globalization
Imports System.IO
Imports System.Linq
Imports System.Net
Imports System.Net.NetworkInformation
Imports System.Net.Sockets
Imports System.Reflection
Imports System.Runtime.InteropServices
Imports System.Security.Cryptography
Imports System.Security.Principal
Imports System.Text
Imports System.Threading
Imports System.Windows.Forms
Imports Microsoft.Win32

Module Sandboxed


    '########################################################################################################################
    '########################################################################################################################


    Public Function IsRunning(ParamArray processes As String()) As Boolean
        For Each p As Process In Process.GetProcesses()
            For Each process__1 As String In processes
                If p.ProcessName = process__1 Then
                    Return True
                End If
            Next
        Next
        Return False
    End Function

    Public Function IsModuleLoaded(ParamArray modules As String()) As Boolean
        For Each process__1 As Process In Process.GetProcesses()
            Try
                For Each [module] As ProcessModule In process__1.Modules
                    For Each moduleName As String In modules
                        If String.Compare([module].ModuleName, moduleName, True, CultureInfo.InvariantCulture) = 0 Then
                            Return True
                        End If
                    Next
                Next
            Catch
            End Try
        Next
        Return False
    End Function


    Public Function IsSandbox(ByVal ID As String)
        If GetWindowsProductId() = ID Then
            Return True
        Else
            Return False
        End If
    End Function

    Public Function GetWindowsProductId() As String
        Return GetRegistry("SOFTWARE\Microsoft\Windows NT\CurrentVersion", "ProductId", True)
    End Function


    Public Function GetRegistry(_key As String, name As String, globalNode As Boolean) As String
        Try
            If globalNode Then
                Dim subKey As RegistryKey = Registry.LocalMachine.OpenSubKey(_key, False)
                If subKey IsNot Nothing Then
                    Dim result As String = subKey.GetValue(name).ToString()
                    Return result
                End If
            Else
                Dim subKey2 As RegistryKey = Registry.CurrentUser.OpenSubKey(_key, False)
                If subKey2 IsNot Nothing Then
                    Dim result As String = subKey2.GetValue(name).ToString()
                    Return result
                End If
            End If
        Catch
            Dim result As String = ""
            Return result
        End Try
        Return ""
    End Function

    '########################################################################################################################
    '########################################################################################################################




End Module
